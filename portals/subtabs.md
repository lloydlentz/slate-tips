#Tabbed Portal with SubTabs.


This is working OK here. 

https://engage.macalester.edu/portal/subtabs?tab=second&subtab=three

## Default
```HTML
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title></title>

    <style type="text/css">/* Portal tabs ... initial customizations */
      #content ul.tabs li a {height: auto; font-size: 14px; text-align: center;}
      .part ul.tabs {margin: 0 0 1em; width:100%;}
      .part ul.tabs li {width:20%;} /* example ... adjust tab width as desired */
      .part ul.tabs li a {background-color: #f5f5f5; color: #000000; padding: 5px 15px; border-radius: 3px; margin-right: 7px;}
      .part ul.tabs li a.active {color: #fff !important; background-color: #00669e;}
      .part ul.tabs li a:hover {background-color: #fafafa !important; color: #00669e !important;}
    </style>

  </head>
  <body>
    <ul class="tabs">
      <li>
        <a data-tab="home" href="#">Home</a>
      </li>
      <li>
        <a data-tab="second" href="#">Second Tab</a>
      </li>
      <li>
        <a data-tab="third" href="#">Third Tab</a>
      </li>
    </ul>

    <div id="content_body">
    </div>
    <script type="text/javascript">    //page script
    
    var originalUrl = window.location.href; // Store the original URL
    var loadTab = function(tab, isBack, subtab) {
      if (!isBack) {
          // Use the original URL only if a tab is not selected
          var newUrl = originalUrl;
          var urlParams = new URLSearchParams(window.location.search);
          if (tab) {
            urlParams.set('tab', tab);
          } else {
            urlParams.delete('tab');
          }
          if (subtab) {
            urlParams.set('subtab', subtab);
          } else {
            urlParams.delete('subtab');
          }
          history.pushState(tab, null, newUrl.split('?')[0] + '?' + urlParams.toString());
      }
      $("a[data-tab]").removeClass("active");
      $("a[data-tab='" + tab + "']").addClass("active");

      $.get( "?cmd=" + tab, function( data ) {
        $("#content_body").html( data );
        if (subtab){
          console.log(subtab);
          FW.Lazy.Fetch("?cmd=" + tab + "_" + subtab, $("#subcontent_body"));
        }

      });  
    };


      window.addEventListener("popstate", function(e){
        if (e.state) loadTab(e.state, true);
        else history.back();
      });

      // Defining the onClick event this way will bind to all dynamically created page elements.
      // https://stackoverflow.com/a/16598231/4594
      $(document).on("click", 'a[data-tab]', function(event) { 
      // $("a[data-tab]").on("click", function(){  
        var tab = $(this).data("tab")
        var subtab = $(this).data("subtab")
        console.log("tab:",tab," subtab:",subtab)
        loadTab(tab,false,subtab); 
        return false;
      });

      var qs = FW.decodeFormValues(location.search.substring(1));
      if (qs["tab"]){
        if (qs["subtab"]){
          loadTab(qs["tab"],false,qs["subtab"]);
        } else {
          loadTab(qs["tab"]);
        }
      } else {
        loadTab("home");
      } 


      </script>
  </body>
</html>

```
