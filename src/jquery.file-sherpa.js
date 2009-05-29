var FileSherpa = {};

(function($) {
  $.extend(FileSherpa, {
    widgets: {},
    widget: function(element, options) {
      this.options = $.extend({swfUrl: "/flash/uploader.swf",
			       width:  250,
			       height: 250}, options);
      this.element = $(element);

      var swf = new SWFObject(this.options.swfUrl,
			      this.element.attr('id'),
			      "100%",
			      "100%",
			      "9.0.0");
      swf.addParam('wmode', 'transparent');
      swf.addParam('allowScriptAccess', 'always');
      swf.addParam('menu', 'false');
      swf.addVariable('elementID', this.element.attr('id'));
      swf.addVariable('eventHandler', 'FileSherpa.eventHandler');
      swf.write(this.element.attr('id'));

      FileSherpa.widgets[this.element.attr('id')] = this;
    },
    eventHandler: function(id, event) {
      FileSherpa.widgets[id].element.trigger(event);
    }
  });

  $.fn.fileSherpa = function(options) {
    $(this).each(function(i, element) {
      new FileSherpa.widget(element, options);
    });
  }
}(jQuery));

