# TinyClipboard
Copy plain/rich text to clipboard in browsers

# Setup
Add `<script type="text/javascript" src="tinyclipboard.js"></script>` to your page 

# Usage
Copy the element text to clipboard and keep formatting
```js
var clipboard = new TinyClipboard({
  button: "idButton",
  target: "idDiv"
  });
```
Copy html/rich text to clipboard and keep formatting
```js
var clipboard = new TinyClipboard({
  button: 'idButton',
  content: '<a href="www.google.com"><strong>google link</strong></a>',
  format: 'html'
  });
```
Copy plain text to clipboard
```js
var clipboard = new TinyClipboard({
  button: 'idButton',
  content: 'Some text here',
  format: 'text'
  });
```
# Options
|Option |Type |Default|Note|
|------|--------|-----|----|
|button|`String`|null|The button ID. This is required since copy will be executed when a button is clicked.
|target|`String`|null|The element ID. The target and content options are mutually exclusive.
|content|`String`|''|The target and content options are mutually exclusive.
|format|`String`|'html'|This option only works with the content option.

# Methods
`.destroy()`:
Destroy an element's TinyClipboard

`.message()`:
Return true if the copy was successful

# Support browsers
IE 11, Chrome, Firefox, Safari 

# License
MIT Copyright (c) Yu-Jean Chen
