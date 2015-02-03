angular.module('reveal', [])
.directive('ng-reveal', function() {
  return {
    restrict:'AE',
    replace:'true',
    template:'<div class="slides"></div>'
    scope: {
      slides: '=slides',
      showControls: '=showControls',
      loop: '=loop'
    },
    //[TODO] Use compile function
    link: function(scope, elem, attrs) {
      elem.addClass('slides');
      for (var i = 0; i < scope.slides.length; i++) {
        var elementString = "<section>"
        if(scope.slides[i].hasOwnProperty('background')){
          elementString = '<section data-background="'+ scope.slides[i].background +'">';
        }
        var section = angular.element(elementString);
        var steps = scope.slides[i].pages;
        // Project doesn't contain pages
        if(!scope.slides[i].hasOwnProperty('pages')){
          var content = angular.element(scope.slides[i].content);
          section.append(content);
        }
        //if there is only one step
        else if (steps.length == 1) {
          var content = angular.element("<h2>").html(scope.slides[i].name);
          section.append(content);
        } else {
          for (var j = 0; j < steps.length; j++) {
            var elementHtmlString = '<section class="reveal_section">'
            var subSection = null;
            if(steps[j].hasOwnProperty('image')){
              if(!steps[j].image.hasOwnProperty('style')){
                elementHtmlString = '<section class="reveal_section" data-background="'+ steps[j].image.url+'">'
                subSection = angular.element(elementHtmlString);
              } else {
                elementHtmlString = '<section class="reveal_section">'
                subSection = angular.element(elementHtmlString);
                subSection.append('<img style="'+steps[j].image.style+'" src="'+ steps[j].image.url +'">')
              }
            }
            // var content = angular.element("<h1>").html(steps[j].caption);
            // subSection.append(caption);
            section.append(subSection);
          }
        }
        elem.append(section);
      }
      Reveal.initialize({
        loop: scope.loop || false,
        controls:scope.showControls || true,
        transition: Reveal.getQueryHash().transition || 'none'
      });
    }
  };
});
