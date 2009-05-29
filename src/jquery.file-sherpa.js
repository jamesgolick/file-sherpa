(function($) {
  var FileSherpaEventHandler = function() {
    console.log('asdf');
  }

  var FileSherpa = function(element, options) {
    this.options = $.extend({swfUrl: "/flash/uploader.swf",
			     width:  250,
			     height: 250}, options);
    this.element = $(element);

    swfobject.embedSWF(this.options.swfUrl, 
		       this.element.attr('id'),
		       this.options.width,
		       this.options.height,
		       "9.0.0",
		       {eventHandler: FileSherpaEventHandler});
  }

  $.fn.fileSherpa = function(options) {
    $(this).each(function(i, element) {
      new FileSherpa(element, options);
    });
  }
}(jQuery));

