Reader review forms are sometimes limmited by the standard window width in the reader. This code adds an "Expand/Collapse" link at the top of the review form to adjust the width of the form in the reader.
// Expand the window

function expand() {

jQuery('.reader_send_panel').animate({"width": "35%", "top": "27px"});

jQuery('#expandme').text("Collapse");

jQuery('#expandme').toggleClass('closed')

}

// Collapse the window

function collapse() {

jQuery('.reader_send_panel').animate({"width": "350px", "top": "27px"});

jQuery('#expandme').text("Expand");

jQuery('#expandme').toggleClass('closed')

}

// Add the link

jQuery('.reader_send_panel_content').prepend('<a class="closed" href="#" id="expandme" name="expandme">Expand</a>');

// Allow the window to flow over the left side menu.

jQuery('.reader_send_panel').css({"z-index": 2});

// Comment out this line to not expand it by default when the review form opens.

expand();

// Add a click event to the expand link.

jQuery('#expandme').click(function(e) {

e.preventDefault();

if (jQuery(this).hasClass('closed')) {

expand();

}

else {

collapse();

}

}); 
