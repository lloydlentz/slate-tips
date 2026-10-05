# Minimize the Slate Banner

1. We love Slate.
2. Screen real estate is precious.
3. Let me choose what shows on my homepage, at least until [Alexander](https://www.instagram.com/agclark27/) hires a real UX and social team. Just sayin'.

### Problem

The Slate banner on the homepage is too big.

<img src="https://raw.githubusercontent.com/lloydlentz/slate-tips/main/img/BannerIssue.jpg" height="200" />

### Solution

Add this to the source of your homepage [report](https://technolutions.zendesk.com/hc/en-us/community/posts/207512068-Report-on-homepage) or [widget](https://technolutions.zendesk.com/hc/en-us/articles/360033418751-Report-Widgets). It hides the banner and adds a "show slate banner" link to bring it back.

```html
<script>
<![CDATA[
if (document.getElementById("tweets-enum")) {
  document.getElementsByClassName('manage_dashboard_content')[0].style.display = 'none';
  var showLink = "<div id='lloydcleanslate'><span onclick=\"document.getElementsByClassName('manage_dashboard_content')[0].style.display = 'block';document.getElementById('lloydcleanslate').style.display = 'none'\" style='cursor:pointer'>show slate banner</span></div>";
  document.getElementsByClassName("manage_dashboard_content")[0].parentElement.innerHTML += showLink;
}
]]>
</script>
```

<img src="https://raw.githubusercontent.com/lloydlentz/slate-tips/main/img/BannerPref.jpg" height="200" />
