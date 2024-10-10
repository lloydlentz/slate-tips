 // Remove the second <td> that contains the <h2>Populations</h2>
    $("table.sidebar td").filter(function() {
        return $(this).find("h2").text() === "Populations";
    }).remove();
    
    // Remove the second <col> from the <colgroup>
    $("table.sidebar colgroup col:nth-child(2)").remove();



 //VER2
      $(document).ready(function() {
        // REMOVE the Populations Sidebar  //

        // Remove the second <td> that contains the <h2>Populations</h2>
        // $("table.sidebar td").filter(function() {
        //     return $(this).find("h2").text() === "Populations";
        // }).remove();
        
        // // Remove the second <col> from the <colgroup>
        // $("table.sidebar colgroup col:nth-child(2)").remove();

        // Actually, just resize it
        $("table.sidebar colgroup col:nth-child(2)").css("width", "100px");

      });
