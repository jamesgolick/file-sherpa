# File Sherpa

File uploads on the web are still a pain in the ass. File sherpa aims to soften the pain by making it easy to unobtrusively add asynchronous uploads without the use of iFrames, style and customize the upload widget, add a progress bar and more.

## Features

  * Asynchronous upload without iFrame
  * Styleable widget
  * Progress bars
  * Multi-file upload (TODO)
  * Client side validation of file size 

## Usage

Take flash/uploader.swf and put it somewhere publicly accessible. Note that this file *must* be served by a web server, due to flash security policy. File sherpa currently expects it at "/flash/uploader.swf", but you can override that by passing swfUrl: "/path/to/your/swf" to the jQuery().fileSherpa method.

Create a file field in your html:

  &lt;input type="file" name="fileData" id="file-field" /&gt;

Then, use the fileSherpa function to convert your field in to a file upload widget. Pass it the url you'd like the file to be uploaded to:

  $('#file-field').fileSherpa({action: '/uploads'});

That line will replace your file field with a full blown file upload widget, including progress bar. The HTML for that widget looks like this:

    <div class="fileSherpa-upload-container" id="file-field">
      <div class="fileSherpa-upload-overlay"></div>
      <div class="fileSherpa-upload-ui">
	<input type="text" class="fileSherpa-filename" />
	<input type="hidden" class="fileSherpa-file-id" />
	<a href="#" class="fileSherpa-browse-link">Browse</a>
	<a href="#" class="fileSherpa-upload-link">Upload</a>
      </div>
      <div class="fileSherpa-progress-bar">
	<div class="fileSherpa-progress"></div>
      </div>
    </div>

You'll need to style the upload overlay so that it covers the Browse button entirely. When a user clicks the browse button, they'll actually be clicking the overlay. So, you'll need to animate hover and blur events yourself via javascript. This is all because of the security rules in Flash Player 10: the browse button must be part of the flash movie itself; it cannot be triggered by javascript.

## Dependencies

  * jquery &lt;= 1.3
  * swfobject 1.5 (for some reason, newer versions don't work properly)

## Events

To integrate this widget with your UI, you'll need to subscribe to one or more events that the flash movie fires. Those events get relayed to the parent element of the uploader widget. *That element will assume the dom id of the element it replaced.*  Here's a list of possible events:

* mouseDown (on the browse button)
* mouseUp (on the browse button)
* rollOver (on the browse button)
* rollOut (on the browse button)
* click (on the browse button)
* fileSelect
  * event.fileList0-n will contain information about the file(s) that were selected. To access this information, you'll have to iterate over the hash and check to see that the key matches /fileList\d/. Each file object will contain the following parameters:
    * size (Number - file size in bytes)
    * cDate (Date - Creation date for the file)
    * mDate (Date - Modification date for the file)
    * name (String - Filename)
    * id (unique id for the file)
* uploadStart
* uploadProgress
  * event.percentComplete contains an integer from 0-100 which represents the progress of the upload
  * event.bytesLoaded contains the number of bytes uploaded so far.
  * event.bytesTotal contains the total number of bytes.
* uploadComplete
* uploadCompleteData
  * event.responseData will contain the data returned by the server as a string.
* uploadError
  * event.status will contain the status message associated with the error.

## Plans

The biggest thing currently missing is more customizability. It'd be nice to have a mode that doesn't create the whole widget or allows you to specify a custom structure for the generated html.

## Credits

File sherpa was developed by (and is copyright) [James Golick](http://jamesgolick.com). The flash piece is from YUI.

## License

File sherpa and swfobject are [MIT licensed](http://en.wikipedia.org/wiki/MIT_License).

The flash piece is BSD licensed: [details here](http://developer.yahoo.com/yui/license.html).

