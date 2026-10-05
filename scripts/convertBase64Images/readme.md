# Batch Convert Base64 Images to Hosted Files

### Problem

Images stored as Base64 in a field value can be very large, and enough of them break Slate's portal render limit.

### Workflow

1. Set up a portal that displays the Base64 images:
   1. The portal must not require authentication (or the script must be able to sign in).
   2. The query finds profile photos stored as Base64.
   3. The view puts the values for the CSV in `data-` attributes.
2. Run a Python script that:
   1. fetches every image from the page
   2. saves them locally
   3. uploads them by SFTP to a regular web server
   4. uploads a CSV to a Source Format to replace each Base64 value with the new image URL

> Turn the unauthenticated portal off when you're done; it exposes the photos.


### Details

#### Query

- Filter: `@photo like 'data:%'`
- Exports:
  - `refid`
  - `img`
  - `filetype`, extracted from the data URL: `substring(@photo, 12, charindex(';', @photo, 1) - 12)`

#### View

```html
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title></title>
  </head>
  <body>
    {% for item in pics %}
    <div style="padding:20px; border: solid 1px">
      <div style="padding:20px">
        {{item.refid}} pic - <img data-filename="img-{{item.refid}}" data-refid="{{item.refid}}" data-url="https://advcs.info/macconnect/img-{{item.refid}}.{{item.filetype}}" src="{{item.img}}" style="height:200px" />
      </div>
      {% if 1=0 %}

      <div style="padding:20px">
        thm - <img data-filename="thm-{{item.refid}}" data-refid="x{{item.refid}}" data-url="https://advcs.info/macconnect/thm-{{item.refid}}.{{item.filetype}}" src="{{item.thm}}" style="height:200px" />
      </div>
      {% endif %}
    </div>
    {% endfor %}
  </body>
</html>
```

#### Python

[script.py](script.py)

