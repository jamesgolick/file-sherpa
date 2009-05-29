function FileSherpaEventHandler(id, event) {
  console.log(event.type);
}

(function($) {
  var FileSherpa = function(element, options) {
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
    swf.addVariable('eventHandler', 'FileSherpaEventHandler');
    swf.write(this.element.attr('id'));
  }

  $.fn.fileSherpa = function(options) {
    $(this).each(function(i, element) {
      new FileSherpa(element, options);
    });
  }
}(jQuery));

