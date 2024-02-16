# Liquid Markup Notes


### Itterate over only unique values
```
{% assign unique_folder = form | map: 'folder' | uniq %}
{% for folder in unique_folder %}
{{folder}}
{% endfor %}
```
