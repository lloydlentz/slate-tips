Script donated by Paul Prewitt (University of Arkansas) on Slack

```JS
 <script type="text/javascript">        var loadTab = function(tab, isBack) {
            if (!isBack) {
                history.pushState({tab: tab}, null, "?tab=" + tab);
            }
            $("a[data-tab]").removeClass("active");
            $("a[data-tab='" + tab + "']").addClass("active");
            FW.Lazy.Fetch("?cmd=" + tab, $("#content_body"), function() {
                if (tab !== "default" && location.hash) {
                    var anchor = $(location.hash);
                    if (anchor.length) {
                        $('html, body').animate({ scrollTop: anchor.offset().top }, 500);
                    }
                }
            });
        };

        window.addEventListener("popstate", function(e) {
            if (e.state) {
                loadTab(e.state.tab, true);
                if (e.state.tab !== "default" && location.hash) {
                    var anchor = $(location.hash);
                    if (anchor.length) {
                        $('html, body').animate({ scrollTop: anchor.offset().top }, 500);
                    }
                }
            }
        });

        $("a[data-tab]").on("click", function() {
            var tab = $(this).data("tab");
            loadTab(tab);
            return false;
        });

        $(document).ready(function() {
            var qs = new URLSearchParams(location.search);
            var initialTab = qs.get("tab") || "default";
            loadTab(initialTab);

            if (initialTab !== "default" && location.hash) {
                var anchor = $(location.hash);
                if (anchor.length) {
                    $('html, body').animate({ scrollTop: anchor.offset().top }, 500);
                }
            }
        });
    </script>
```
 
