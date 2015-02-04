angular.module('revealApp', ['reveal'])
.controller('MainCtrl', function($scope){
  console.log('Main controller');

  $scope.slides = [
    {
      name:'Slide 1',
      background:'#46494c',
      pages:[
        {
          image:{url:'http://placehold.it/350x150', style:'width:350px; height:150px;'},
          content:'<h2 class="name" style="color:#DCDCDD">Scott Prue</h2><h4>Project Portfolio</h4><p style="margin-top:20%;"><small style="color:#C5C3C6">Arrow keys to navigate</small><br><small style="color:#C5C3C6"> ESC for overview</small></p>'
        },
        {
          image:{url:'http://placehold.it/1920x1080'},
          content:'<h4>Fullscreen Background</h4>'
        },
      ]
    },
    {
      name:'Slide 2',
      background:'#46494c',
      pages:[
        {
          image:{url:'http://placehold.it/350x150', style:'width:500px; border-style:none; background-color:white;'},
          content:'<h2 class="name" style="color:#DCDCDD">Scott Prue</h2><h4>Project Portfolio</h4><p style="margin-top:20%;"><small style="color:#C5C3C6">Arrow keys to navigate</small><br><small style="color:#C5C3C6"> ESC for overview</small></p>'
        },
        {
          image:{url:'http://placehold.it/1920x1080'},
          content:'<h4>Fullscreen Background</h4>'
        },
      ]
    },
  ];
  $scope.current.slide = $scope.slides[0];
  
  Reveal.addEventListener('slidechanged', function( event ) {
    // event.previousSlide, event.currentSlide, event.indexh, event.indexv
    $scope.current.project = $scope.slides[event.indexh];
    $scope.current.slide = $scope.slides[event.indexh];
    if(projectData.hasOwnProperty('pages') && projectData.pages.length){
      $scope.current.slide = projectData.pages[event.indexv];
    }
    $scope.currentSlide = slideData;
    console.log('currentSlide:', $scope.currentSlide);
    $scope.$apply();
  });
});
