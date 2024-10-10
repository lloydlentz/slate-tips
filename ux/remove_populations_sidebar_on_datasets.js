 // Remove the second <td> that contains the <h2>Populations</h2>
    $("table.sidebar td").filter(function() {
        return $(this).find("h2").text() === "Populations";
    }).remove();
    
    // Remove the second <col> from the <colgroup>
    $("table.sidebar colgroup col:nth-child(2)").remove();
