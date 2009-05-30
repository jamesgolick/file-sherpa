# File Sherpa

File uploads on the web are still a pain in the ass. File sherpa aims to soften the pain by making it easy to unobtrusively add asynchronous uploads without the use of iFrames, style and customize the upload widget, add a progress bar and more.

## Features

  * Asynchronous upload without iFrame
  * Styleable widget
  * Progress bars
  * Multi-file upload (TODO)
  * Client side validation of file size 

## Usage

Create a file field in your html:

  &lt;input type="file" name="fileData" id="file-field" /&gt;

Then, use the fileSherpa function to convert your field in to a file upload widget. Pass it the url you'd like the file to be uploaded to:

  $('#file-field').fileSherpa({action: '/uploads'});

That line will replace your file field with a full blown file upload widget, including progress bar. The HTML for that widget looks like this:

  &lt;div class="fileSherpa-upload-container" id="file-field"&gt;
    &lt;div class="fileSherpa-upload-overlay" id="fileSherpa-swf-n"&gt;&lt;/div&gt;
    &lt;div class="fileSherpa-upload-ui"&gt;
      &lt;input type="text" class="fileSherpa-filename" /&gt;
      &lt;input type="hidden" class="fileSherpa-file-id" /&gt;
      &lt;a href="#" class="fileSherpa-browse-link"&gt;Browse&lt;/a&gt;
      &lt;a href="#" class="fileSherpa-upload-link"&gt;Upload&lt;/a&gt;
    &lt;/div&gt;
    &lt;div class="fileSherpa-progress-bar"&gt;
      &lt;div class="fileSherpa-progress"&gt;&lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;


