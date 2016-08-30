angular.module('reveal', [])
.constant('revealConfig', {})
.directive('ng-reveal', ['revealConfig', function(revealConfig) {

  if (angular.isUndefined(window.Reveal)) {
    throw new Error('ng-reveal needs Revealjs to work');
  }
  var initReveal = function(reveal){
    //Set default values
    var optionsObj = {transition:Reveal.getQueryHash().transition || 'none'};
    if(angular.isDefined(opts.slides)){
      optionsObj.slides = opts.slides;
    }
    if(angular.isDefined(opts.transition)){
      optionsObj.transition = opts.transition
    }
    //Boolean options
    if(angular.isDefined(opts.loop)){
      optionsObj.loop = opts.loop;
      // reveal.configure({});
    }
    if(angular.isDefined(opts.controls)){
      optionsObj.controls = opts.controls;
    }
    //Initialize reveal with options
    reveal.initialize(optionsObj);
    if(angular.isDefined(opts.onLoad)){
      scope.$evalAsync(function () {
        if (angular.isFunction(opts.onLoad)) {
          reveal.addEventListener('ready', function( event ) {
            opts.onLoad();
          });
        } else {
          throw new Error('ui-ace use a function as callback.');
        }
      });
    }
    // [TODO] Return current slide when slidechanged
    if(angular.isDefined(opts.onChange)){
      scope.$evalAsync(function () {
        if (angular.isFunction(opts.onChange)) {
          reveal.addEventListener('slidechanged', function( event ) {
            opts.onChange();
          });
        } else {
          throw new Error('ui-ace use a function as callback.');
        }
      });
    }
  };


  return {
    restrict:'AE',
    replace:'true',
    template:'<div class="slides"></div>',
    //[TODO] Use compile function
    link: function(scope, elem, attrs) {
      /**
       * Reveal Object
       */
      var reveal = window.Reveal;

      for (var i = 0; i < attrs.slides.length; i++) {
        var slide = attrs.slides[i];
        var section = angular.element("<slide>");
        section.attr('content', slide);
        //if there is only one step
        if (slide.hasOwnProperty('pages') && slide.pages.length == 1) {
          var content = angular.element("<h2>").html(slide.name);
          section.append(content);
        } else if(slide.hasOwnProperty('pages') && slide.pages.length > 1) {
          for (var j = 0; j < slide.pages.length; j++) {
            var subSection = angular.element('<slide>');
            subSection.attr('content', slide.pages[j]);
            section.append(subSection);
          }
        }
        elem.append(section);
      }
      initReveal(reveal);
    }
  };
}]).directive('slide', function(){
  return {
    restrict: 'AE',
    template:'<section class="reveal_section">',
    scope:{
      content:'=content'
    },
    link:function(scope, elem, attrs){
      if(angular.isDefined(attrs.content)){
        var slide = attrs.content;
        if(slide.hasOwnProperty('background')){
          elem.attr('data-background', slide.background);
        }
        if (slide.hasOwnProperty('pages') && slide.pages.length == 1) {
          var content = angular.element("<h2>").html(slide.name);
          elem.append(content);
        }
        if(slide.hasOwnProperty('image')){
          var img = angular.element('<img>');
          img.attr('src', slide.image.url);
          if(slide.image.hasOwnProperty('style')){
            img.attr('style', slide.image.style);
          }
          elem.append(img);
        }
        // Project contains content
        // if(slide.hasOwnProperty('content') && !slide.hasOwnProperty('pages')){
        //   var content = angular.element(slide.content);
        //   section.append(content);
        // }
      }
    }
  }
});
