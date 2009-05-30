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
      FileSherpa.widgets[id].element.trigger(event);
    }
  });

  $.extend(FileSherpa.widget.prototype, {
    initialize: function(element, options) {
      this.options = $.extend({swfUrl: "/flash/uploader.swf",
			       width:  250,
			       height: 250}, options);
      this.element   = $(element);
      this.elementId = $(element).attr('id');
      this.swfId     = ["fileSherpa-swf-", FileSherpa.widgetCount].join('');

      this.initUploaderStructure();
      this.initSwf();

      FileSherpa.registerWidget(this);
    },
    initUploaderStructure: function() {
      var container = $('<div class="fileSherpa-upload-container"/>');
      this.element.replaceWith(container);
      this.element  = container;

      this.element.attr('id', this.elementId);
      this.element.append($('<div class="fileSherpa-upload-overlay"/>'));

      var uploadUi = $('<div class="fileSherpa-upload-ui"/>');
      uploadUi.append('<input type="text" class="filesherpa-filename"/>');
      uploadUi.append('<input type="hidden" class="filesherpa-file-id"/>');
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
  });

  $.fn.fileSherpa = function(options) {
    $(this).each(function(i, element) {
      new FileSherpa.widget(element, options);
    });
  }
}(jQuery));

