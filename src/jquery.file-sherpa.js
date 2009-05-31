var FileSherpa = {};

(function($) {
  $.extend(FileSherpa, {
    registerWidget: function(widget) {
      this.widgets[widget.swfId] = widget;
      this.widgetCount		+= 1;
    },
    widgetCount: 0,
    widgets: {},
    widget: function() { this.initialize.apply(this, arguments); },
    eventHandler: function(id, event) {
      FileSherpa.widgets[id].eventHandler(event);
    }
  });

  $.extend(FileSherpa.widget.prototype, {
    initialize: function(element, options) {
      this.options = $.extend({swfUrl:    "/flash/uploader.swf",
			       width:     250,
			       height:    250,
			       action:	  "/files",
			       method:    "post",
			       fieldName: "file"}, options);
      this.element   = $(element);
      this.elementId = $(element).attr('id');
      this.swfId     = ["fileSherpa-swf-", FileSherpa.widgetCount].join('');

      if (this.element.attr('name'))
	this.options.fieldName = this.element.attr('name');

      this.initUploaderStructure();
      this.initSwf();
      this.initSwfEvents();

      FileSherpa.registerWidget(this);
    },
    initUploaderStructure: function() {
      var container = $('<div class="fileSherpa-upload-container"/>');
      this.element.replaceWith(container);
      this.element  = container;

      this.element.attr('id', this.elementId);
      this.element.append($('<div class="fileSherpa-upload-overlay"/>'));

      var uploadUi = $('<div class="fileSherpa-upload-ui"/>');
      uploadUi.append('<input type="text" class="fileSherpa-filename"/>');
      uploadUi.append('<input type="hidden" class="fileSherpa-file-id"/>');
      uploadUi.append('&nbsp;<a href="#" class="fileSherpa-browse-link">Browse</a>');
      uploadUi.append('&nbsp;<a href="#" class="fileSherpa-upload-link">Upload</a>');
      this.element.append(uploadUi);

      var progressBar = $('<div class="fileSherpa-progress-bar">');
      progressBar.append($('<div class="fileSherpa-progress"/>'));
      this.element.append(progressBar);

      this.element.find('.fileSherpa-upload-overlay').attr('id', this.swfId);
    },
    initSwf: function() {
      this.swf = new SWFObject(this.options.swfUrl,
				 this.element.attr('id'),
				 "100%",
				 "100%",
				 "9.0.0");
      this.swf.addParam('wmode', 'transparent');
      this.swf.addParam('allowScriptAccess', 'always');
      this.swf.addParam('menu', 'false');
      this.swf.addVariable('elementID', this.swfId);
      this.swf.addVariable('eventHandler', 'FileSherpa.eventHandler');
      this.swf.write(this.swfId);
    },
    initSwfEvents: function() {
      var self = this;
      this.element.bind('fileSelect', function(event) {
	self.getFileIdField().val(event.fileList.file0.id);
	self.getFilenameField().val(event.fileList.file0.name);
      });

      this.element.find('.fileSherpa-upload-link').click(function() {
	self.startUpload();

	return false;
      });

      this.element.bind('uploadStart', function(event) {
	self.setProgress(1);
      });

      this.element.bind('uploadProgress', function(event) {
	self.setProgress(event.percentComplete);
      });

      this.element.bind('uploadComplete', function(event) {
	self.setProgress(100);
      });
    },
    eventHandler: function(event) {
      if (event.type == 'uploadProgress') {
	event.percentComplete = parseInt(event.bytesLoaded / event.bytesTotal * 100);
      } else if (event.type == 'uploadCompleteData') {
	event.responseData = event.data;
      }

      this.element.trigger(event);
    },
    getSwfObject: function() {
      return document[this.elementId];
    },
    getFileIdField: function() {
      return this.element.find('.fileSherpa-file-id');
    },
    getFilenameField: function() {
      return this.element.find('.fileSherpa-filename');
    },
    setProgress: function(percentComplete) {
      var width = [percentComplete, '%'].join('');
      this.element.find('.fileSherpa-progress').css('width', width);
    },
    startUpload: function() {
      this.getSwfObject().upload(self.getFileIdField().val(),
				 self.options.action,
				 self.options.method,
				 {},
				 self.options.fieldName);
    }
  });

  $.fn.fileSherpa = function(options) {
    if (options) { 
      this.each(function(i, element) {
	new FileSherpa.widget(element, options);
      });

      return this;
    } else {
      return FileSherpa.widgets[$(this).find('.fileSherpa-upload-overlay').attr('id')];
    }
  }
}(jQuery));

