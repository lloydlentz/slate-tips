To allow a date picker

```
form.getElement('ExportKeyValue').datepicker();
```

To restict the date

```
Form.getQuestion('date').find('.hasDatepicker').datepicker("option", {
    "minDate": "08/01/2024",
    "maxDate": "08/23/2024"
});
```
