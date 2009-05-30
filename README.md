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

  <input type="file" name="fileData" id="file-field" />

Then, use the fileSherpa function to convert your field in to a file upload widget. Pass it the url you'd like the file to be uploaded to:

  $('#file-field').fileSherpa({action: '/uploads'});



