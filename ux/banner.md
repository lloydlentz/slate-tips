# Slate Banner.

1) We love slate
2) Screen real-estate is precious
2) Let me have the option of what shows on my office homepage... at least until [Alexander](https://www.instagram.com/agclark27/) hires a real UX and Social presence team.  ... Just sayin.  


### ISSUE
The Slate Banner is "too big"

<img src="https://raw.githubusercontent.com/lloydlentz/slate-tips/main/img/BannerIssue.jpg" height="200" />


### Solution
On your main page [report](https://technolutions.zendesk.com/hc/en-us/community/posts/207512068-Report-on-homepage)/[widget](https://technolutions.zendesk.com/hc/en-us/articles/360033418751-Report-Widgets) Drop this into the source code of the page

```HTML
<script>
<![CDATA[
    	if (document.getElementById("tweets-enum")){
   document.getElementsByClassName('manage_dashboard_content')[0].style.display = 'none';
   var lloyds_got_your_back = "<div id='lloydcleanslate'><span onclick=\"document.getElementsByClassName('manage_dashboard_content')[0].style.display = 'block';document.getElementById('lloydcleanslate').style.display = 'none'\" style='cursor:pointer'>show slate banner</span></div>";
   document.getElementsByClassName("manage_dashboard_content")[0].parentElement.innerHTML += lloyds_got_your_back;
}
]]>
</script>
```

<img src="https://raw.githubusercontent.com/lloydlentz/slate-tips/main/img/BannerPref.jpg" height="200" />
