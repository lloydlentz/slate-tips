It would be handy to have the page know to add the "Required" asktrisks 

Here is a tip from Jared Randall (Bowdoin College)

``` css
 [data-required="1"] label:after {
	 color: #c1001b;
	 font-weight:bold;
	 content: " *";
}
 [data-required="1"] legend:after {
	 color: #c1001b;
	 content: " *";
	 font-weight:bold;
}
 [data-required="1"] fieldset label:after {
	 color: #eeeeee;
	 content: " *";
	 font-weight:bold;
}
```
