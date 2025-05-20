// Add this script to part of your person Dashboard

function AnimateRotate(elem, d){
  elem.each(function() {
    var $this = $(this);
    $({deg: 0}).animate({deg: d}, {
        step: function(now, fx){
            $this.css({
                transform: "rotate(" + now + "deg)"
            });
        },
        complete: function() {
            $this.css({ transform: "" }); // Reset after rotation
        }
    });
  });
}

function showConfettiEmoji(target) {
  const emoji = $('<div class="confetti-emoji">🎉</div>').appendTo('body');
  emoji.css({
    position: 'absolute',
    left: target.offset().left + target.width() / 2,
    top: target.offset().top - 10,
    fontSize: '20px',
    pointerEvents: 'none',
    opacity: 1
  }).animate({
    top: '-=50',
    opacity: 0
  }, 1000, function() {
    emoji.remove();
  });
}

// Wait for DOM to be fully ready
$(document).ready(function() {
  // Locate the span.subheading that includes the ID number
  $('span.subheading').each(function() {
    // Get the raw text from the subheading
    var text = $(this).text().trim();
    // Use regex to find the numeric ID at the end (allow leading zeros, 4+ digits)
    var match = text.match(/(\b0*\d{4,})$/); // match 4+ digit number with optional leading zeros at end

    if (match) {
      var id = match[1];

      // Replace the plain text ID with a span that we can style and click
      var htmlWithClickableID = $(this).html().replace(id, `<span class="person-id" style="cursor:pointer; display: inline-block;">${id}</span>`);
      $(this).html(htmlWithClickableID);

      // Add click handler
      $('.person-id').off('click').on('click', function() {
        var idElem = $(this);
        AnimateRotate(idElem, 360);
        showConfettiEmoji(idElem);

        navigator.clipboard.writeText(idElem.text().trim()).then(function() {
            $('<div class="copy-message">Copied</div>').appendTo('body').css({
                position: 'absolute',
                top: idElem.offset().top - 10,
                left: idElem.offset().left + idElem.outerWidth() + 10,
                opacity: 0
            }).animate({opacity: 1}, 500).delay(1000).fadeOut(500, function() {
                $(this).remove();
            });
        }).catch(function(err) {
            console.error('Failed to copy text: ', err);
        });
      });
    }
  });
});
