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


I always like to talk about the two parts of the system. **Getting Data In**, and getting Data Out. My phillosophy is that it should be super easy to get the data in. Of course we want it to be correct. This means no missing pieces. But if someone entries 1/1/24 or Jan 1, 2024, or 2024-01-01, great. We all know what they mean. Expecting that every date format, entered by hand, loaded from a file, transfered from an ELT load, will always be the same format is a losing battle.

My "Style Guide" for any form expecting a date, is to make it a from text field, and in the scripts of the form add

```form.getElement('ExportKeyValue').datepicker(); ```

**Getting data out**. This is the "presentation" side of that data. Remember, by default all custom fields are stored in the inside of Slate as just text. So if you export a field, to a query, or an EntityWidget Properties export, Slate will, by default, show the text that was stored. Slate does a great job of converting data into a consistent format. In your export, if you change the format to "Date", then, like magic, all of the dates will have a consistant look and feel.

The nice thing is when you go to do date comparisons, or math (days since, etc), slate will also take care of all of that for you, no matter if you have 1/1/24 or Jan 1, 2024, or 2024-01-01 stored as the actual data element.
