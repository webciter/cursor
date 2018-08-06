<h1>WebCiter/Cursor</h1>

WORKING NEEDS MORE WORK

<p>This is a JavaScript Class to convert an image into a multipart cursor.</p>

<h3>How to Install</h3>

<h4>NPM</h4>

<code>npm install webciter.projects.cursor</code>

Once added to your project make sure your document has an image within the dom with the id selector of <code>#cursor_image</code>
also hide it with <code>display: none;</code>, Once the page has loaded the cursor will automatically be overridden.

<h4>HTML</h4>

<code>
    &lt;img style="display:none;" src="cursors/default.png" id="cursor_image"/&gt;
</code>


<h4>Example Cursor</h4>

The cursor image must be the exact dimensions of 1088x32 pixels with png transparency, each segment in the image is exactly 32x32 pixels. It may take some time to correctly align the pointers etc of each segment if your making your own cursor. Each of all the states must be completed for a complete cursor for example drag and drop operations. Some states may be a little glitchy so some design elements might need changing if your looking for consistency.

Unfinished Cursor Image

<img src="cursors/default.png" style="width: 1088px; height: 32px;" />









