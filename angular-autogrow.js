var app = angular.module("medeo", [])


app.directive('autogrow', function() {
  return function(scope, element, attr){
    var minHeight = element[0].offsetHeight,
      paddingLeft = element.css('padding-left'),
      paddingRight = element.css('padding-right');

    var $shadow = angular.element('<div></div>').css({
      'font-size'  : element.css('font-size'),
      'font-family': element.css('font-family'),
      'width'      : element.css('width'),
      'padding-top'   : element.css('padding-top'),
      'padding-right' : element.css('padding-right'),
      'padding-bottom': element.css('padding-bottom'),
      'padding-left'  : element.css('padding-left'),
      'line-height': element.css('padding-left'),
      'overflow-x' : 'hidden',
      'position'   : 'absolute',
      'top'        : 0,
      'left'   : -9999,
      'white-space': 'pre-wrap',
      'word-wrap': 'break-word'
    });
    angular.element(document.body).append($shadow);

    var update = function() {
      var times = function(string, number) {
        for (var i = 0, r = ''; i < number; i++) {
          r += string;
        }
        return r;
      }

      var val = element.val().replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/&/g, '&amp;')
        .replace(/\n$/, '<br/>&nbsp;')
        .replace(/\n/g, '<br/>')
        .replace(/\s{2,}/g, function(space) { return times('&nbsp;', space.length - 1) + ' ' });
      $shadow.html(val);

      console.log(element.css('width'));
      element.css('height', Math.max($shadow[0].offsetHeight + 10 /* the "threshold" */, minHeight) + 'px');
      element.css('overflow', 'hidden');
      element.css('display', 'block');
    }

    element.bind('keyup keydown keypress change', update);
    update();
  }
});