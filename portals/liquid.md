# Liquid Markup Notes

### Iterate over only unique values

```liquid
{% assign unique_folder = form | map: 'folder' | uniq %}
{% for folder in unique_folder %}
  {{ folder }}
{% endfor %}
```

See also: [Display a table from a delimited string](../misc/liquid-loop-table.md).
