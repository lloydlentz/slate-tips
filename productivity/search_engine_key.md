# Chrome Search Shortcuts for Slate

Add custom search engines to Chrome so you can type a keyword in the address bar to search the Knowledge Base, Slate Feedback, or your own instance.

_Pro tip credit: Paul Turchan, Technolutions._

1. Open `chrome://settings/searchEngines`.
2. Under **Site search**, click **Add**.
3. Add any of the engines below.

### Knowledge Base articles

- Name: Knowledge Base Articles
- Shortcut: `kba`
- URL:

```
https://technolutions.zendesk.com/hc/en-us/search?filter_by=knowledge_base&utf8=✓&query=%s
```

### Slate Feedback

- Name: Slate Feedback
- Shortcut: `sf`
- URL:

```
https://feedback.technolutions.com/forums/923530-slate?query=%s
```

### Your Slate (person, Ref ID, or email)

- Name: Search Slate for a Person
- Shortcut: `ss`
- URL:

```
https://<your-slate-instance>/manage/lookup/search?q=%s
```
