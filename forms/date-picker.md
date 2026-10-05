# Date Picker on a Text Field

Add a date picker to a text box (replace `ExportKeyValue` with the field's export key):

```javascript
form.getElement('ExportKeyValue').datepicker();
```

Restrict the selectable dates:

```javascript
form.getQuestion('date').find('.hasDatepicker').datepicker("option", {
  minDate: "08/01/2024",
  maxDate: "08/23/2024"
});
```

## Why a text field?

I think about two parts of any system: **getting data in** and **getting data out**.

**Getting data in** should be easy. We want it correct, with no missing pieces, but if someone enters `1/1/24`, `Jan 1, 2024`, or `2024-01-01`, great, we all know what they mean. Expecting every date (typed by hand, loaded from a file, or brought in by an ETL) to arrive in one format is a losing battle. So my style guide for any date question is: make it a text field and add the date picker script above.

**Getting data out** is presentation. Slate stores custom fields as text. When you export one in a query or an entity widget, set the export's format to **Date** and every value comes out in a consistent format. Date comparisons and date math (days since, etc.) work too, whatever format was stored.
