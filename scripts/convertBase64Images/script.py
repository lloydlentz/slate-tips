import os
import csv
import requests
from bs4 import BeautifulSoup
import pysftp
import pandas as pd
import base64

# pip install requests beautifulsoup4 pysftp pandas

# Configuration
URI = "https://engage.macalester.edu/portal/api?cmd=macconnect_profiles"  # Replace with your URI
IMAGE_FOLDER = "images"  # Local folder to save images
LOADED_FOLDER = "images_loaded"  # Folder to move processed images

SFTP_IMAGE_CONFIG = {
    "host": "HOSTNAME",
    "username": "USERNAME",
    "password": "PASSWORD",
    "remote_path": "PATH"
}

SFTP_CSV_CONFIG = {
    "host": "ft.technolutions.net",
    "username": "SFTP ACCOUNT USERNAE",
    "password": "SFTP ACCOUNT PASSWORD",
    "remote_path": "incoming"
}
CSV_FILENAME = "alumni_profileimage_offiste.csv"
DEFAULT_IMAGE_URL = "https://advcs.info/macconnect/profile.jpg"  # Default URL for failed profiles
IMAGE_PATH_BASE = "https://advcs.info/macconnect"

# Ensure directories exist
os.makedirs(IMAGE_FOLDER, exist_ok=True)
os.makedirs(LOADED_FOLDER, exist_ok=True)

def is_base64(s):
    """Check if a string is a valid Base64 encoded string."""
    try:
        if len(s) % 4 == 0:
            base64.b64decode(s, validate=True)
            return True
        return False
    except Exception:
        return False

def download_images_and_extract_data(uri):
    """Download images and extract data-tags."""
    try:
        response = requests.get(uri, timeout=10)
        response.raise_for_status()  # Raise error if the request fails
    except requests.exceptions.RequestException as e:
        print(f"HTTP request failed: {e}")
        return []
    response.raise_for_status()  # Raise error if the request fails
    soup = BeautifulSoup(response.text, "html.parser")

    image_data = []

    # Check if there are any <img> tags
    if not soup.find_all("img"):
        print("No <img> tags found on the webpage. Exiting.")
        exit(1)  # To store metadata for CSV

    for img in soup.find_all("img"):
        img_src = img.get("src")
        if not img_src:
            continue

        data_attrs = {key: img.attrs[key] for key in img.attrs if key.startswith("data-")}

        if img_src.startswith("data:image"):
            # Handle Base64 encoded images
            filetype = img_src.split(';')[0].split('/')[1]
            base64_data = img_src.split(',')[1]

            # Use the data-refid attribute for naming
            image_name = img.get("data-refid", "unknown") + f".{filetype}"
            image_path = os.path.join(IMAGE_FOLDER, image_name)

            try:
                if is_base64(base64_data):
                    # Add padding if necessary
                    base64_data += '=' * (-len(base64_data) % 4)
                    with open(image_path, "wb") as img_file:
                        img_file.write(base64.b64decode(base64_data))
                    data_attrs["data-url"] = f"{IMAGE_PATH_BASE}/{image_name}"  # Build URL with base path
                else:
                    raise ValueError("Invalid Base64 data")
            except Exception as e:
                print(f"Failed to decode Base64 for {image_name}: {e}")
                data_attrs["data-url"] = DEFAULT_IMAGE_URL  # Use default image URL
        else:
            # Handle standard image URLs
            if not img_src.startswith("http"):
                img_src = f"{uri.rstrip('/')}/{img_src.lstrip('/')}"

            image_name = os.path.basename(img_src)
            image_path = os.path.join(IMAGE_FOLDER, image_name)

            try:
                with requests.get(img_src, stream=True) as img_resp:
                    img_resp.raise_for_status()
                    with open(image_path, "wb") as img_file:
                        for chunk in img_resp.iter_content(chunk_size=8192):
                            img_file.write(chunk)
                data_attrs["data-url"] = image_path  # Use local path as URL
            except Exception as e:
                print(f"Failed to download image from {img_src}: {e}")
                data_attrs["data-url"] = DEFAULT_IMAGE_URL  # Use default image URL

        # Include image name in metadata
        data_attrs["image_name"] = image_name
        image_data.append(data_attrs)

    return image_data

def upload_to_sftp(local_path, sftp_config, is_file=True):
    """Upload file or directory to SFTP."""
    cnopts = pysftp.CnOpts()
    cnopts.hostkeys = None  # Disable host key checking

    with pysftp.Connection(
        host=sftp_config["host"],
        username=sftp_config["username"],
        password=sftp_config["password"],
        cnopts=cnopts
    ) as sftp:
        remote_path = sftp_config["remote_path"].replace("\\", "/")  # Ensure remote path uses forward slashes
        if is_file:
            remote_file = os.path.join(remote_path, os.path.basename(local_path)).replace("\\", "/")
            sftp.put(local_path, remote_file)
            print(f"Uploaded file: {local_path} to {remote_file}")
        else:
            for file in os.listdir(local_path):
                local_file_path = os.path.join(local_path, file)
                remote_file_path = os.path.join(remote_path, file).replace("\\", "/")
                try:
                    sftp.put(local_file_path, remote_file_path)
                    print(f"Uploaded file: {local_file_path} to {remote_file_path}")
                except Exception as e:
                    print(f"Failed to upload {local_file_path}: {e}")


def move_processed_images():
    """Move processed images to the loaded folder."""
    for file in os.listdir(IMAGE_FOLDER):
        source = os.path.join(IMAGE_FOLDER, file)
        destination = os.path.join(LOADED_FOLDER, file)
        if os.path.isfile(source):
            try:
                os.replace(source, destination)  # Force move, overwrite if necessary
                print(f"Moved: {source} -> {destination}")
            except Exception as e:
                print(f"Failed to move {source} -> {destination}: {e}")

def create_csv(image_data, csv_filename):
    """Create a CSV file from image metadata."""
    df = pd.DataFrame(image_data)
    df.to_csv(csv_filename, index=False)
    return csv_filename

def main():
    # Step 1: Download images and extract metadata
    print("Downloading images and extracting metadata...")
    image_metadata = download_images_and_extract_data(URI)

    # Step 2: Upload images to SFTP
    print("Uploading images to SFTP...")
    upload_to_sftp(IMAGE_FOLDER, SFTP_IMAGE_CONFIG, is_file=False)

    # Step 3: Move processed images to loaded folder
    print("Moving processed images to loaded folder...")
    move_processed_images()

    # Step 4: Create CSV file
    print("Creating CSV file...")
    csv_path = create_csv(image_metadata, CSV_FILENAME)

    # Step 5: Upload CSV to SFTP
    print("Uploading CSV file to SFTP...")
    upload_to_sftp(csv_path, SFTP_CSV_CONFIG)

    print("Task completed successfully!")

if __name__ == "__main__":
    main()
