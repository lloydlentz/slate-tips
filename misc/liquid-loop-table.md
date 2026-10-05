# Display a Table from a Delimited String in Liquid

> **Note:** You no longer need this. Slate queries and Liquid now support **Dictionary exports**, which are much easier to maintain. Use those instead.

The old approach: export rows joined with `|||` and columns with `|`, then split them in Liquid.

```liquid
{% assign items = errorarray | split: "|||" %}
<table>
  <tbody>
    <tr>
      <td>Person</td>
      <td>HOH</td>
      <td>HOH Override</td>
      <td>Spouse</td>
      <td>HOH</td>
      <td>HOH Override</td>
    </tr>
    {% for item in items %}
      {% assign v = item | split: "|" %}
      {% if v.size > 7 %}
        <tr>
          <td><a href="/manage/lookup/?id={{ v[0] }}">{{ v[1] }}</a></td>
          <td>{{ v[2] }}</td>
          <td>{{ v[3] }}</td>
          <td>{{ v[4] }}</td>
          <td>{{ v[5] }}</td>
          <td>{{ v[6] }}</td>
        </tr>
      {% endif %}
    {% endfor %}
  </tbody>
</table>
```
