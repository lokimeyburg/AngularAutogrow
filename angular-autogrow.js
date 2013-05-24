var app = angular.module("medeo", [])


app.directive('autogrow', function() {
  return function(scope, element, attr){
    var minHeight = element[0].offsetHeight,
      paddingLeft = element.css('padding-left'),
      paddingRight = element.css('padding-right');

    // style the mirror
    var $mirror = angular.element('<div></div>').css({
      'font-size'  : element.css('font-size'),
      'font-family': element.css('font-family'),
      'width'      : element.css('width'),
      'padding'    : element.css('padding'),
      'position'   : 'relative',
      'white-space': 'pre-wrap',
      'word-wrap': 'break-word',
      'border': element.css('border'),
      // CSS3 specific styles
      'box-sizing'          : element.css('box-sizing'),
      '-moz-box-sizing'     : element.css('-moz-box-sizing'),
      '-webkit-box-sizing'  : element.css('-webkit-box-sizing'),
      'line-height'         : element.css('line-height'),

    });

    // create the mirror
    angular.element(document.body).append($mirror);

    // update the mirror
    var update = function() {
      var times = function(string, number) {
        for (var i = 0, r = ''; i < number; i++) {
          r += string;
        }
        return r;
      }

      // send content to the mirror
      var val = element.val().replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/&/g, '&amp;')
        .replace(/\n$/, '<br/>&nbsp;')
        .replace(/\n/g, '<br/>')
        .replace(/\s{2,}/g, function(space) { return times('&nbsp;', space.length - 1) + ' ' });
      $mirror.html(val);

      // sync mirror width
      $mirror.css('width', element.css('width'));

      // style the textarea
      element.css('height', Math.max($mirror[0].offsetHeight + 10 /* the "threshold" */, minHeight) + 'px');
      element.css('overflow', 'hidden');
      element.css('display', 'block');
    }


    // bind to keypresses and window width changes
    element.bind('keyup keydown keypress change', update);
    $(window).bind("resize", update); // TODO: remove jquery dependency.

    update();
  }
});