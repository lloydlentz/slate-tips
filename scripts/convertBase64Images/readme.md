## Batch Convert your Base64 Images to a locally hosted server

### Issue

Images stored in Base64 format in a field value, are SUPER BIG, sometimes, and end up breaking the limit of a slate portal rendering

### Ideas Workflow
1) Setup a Portal that will display Base64 Images.
  1) have a portal that does not need any authentication
  2) Setup your query to look for Profile Photos that are base 64 type
  3) Setup your View, with data- fields to be included in the CSV file.
4) Write a Python Script that will
  1) fetch all the images from the page
  2) Save to a local drive
  3) Upload via SFTP to a regular webserver
  4) Upload a CSV file to a Source Format location to update the Alumni Directory Profile field from the Base64 text to the URL of the new iamge.


### Details

#### query
 * `@photo like 'data:%'` in the filter
 * Exports
   * RefID
   * IMG
   * filetype - which extracts the filetype from the base64 string `substring(@photo,12, CHARINDEX(';',@photo,1)-12)`
  
### View 

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

### Python

[script](script.py)

