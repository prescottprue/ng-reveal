# ng-reveal

Angular wrapper for [Revealjs](http://lab.hakim.se/reveal-js/#/) presentation library.


## Get Started

1. Get ng-reveal in one of the following ways:
- Clone/Download this repository
- *COMING SOON* reference CDN: [https://s3.amazonaws.com/prescottprue/ng-reveal/current/ng-reveal.js](https://s3.amazonaws.com/prescottprue/ng-reveal/current/ng-reveal.js)
- *COMING SOON* via **[Bower](http://bower.io/)**: by running `$ bower install ng-reveal` from your console
- *COMING SOON* or via **[npm](https://www.npmjs.org/)**: by running `$ npm install ng-reveal` from your console

2. Include `ng-reveal.js` (or `ng-reveal.min.js`) in your `index.html`, after including Angular itself.

3. Add `'reveal'` to your main module's list of dependencies.

When you're done, your setup should look similar to the following:

```html
<!doctype html>
<html ng-app="myApp">
<head>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular.min.js"></script>
<script src"//cdnjs.cloudflare.com/ajax/libs/reveal.js/3.0.0/js/reveal.min.js"></script>
<script src="js/ng-reveal.min.js"></script>
<script>
var myApp = angular.module('myApp', ['reveal']);
</script>
</head>
<body>
<div class="reveal" >
<!-- Any section element inside of this container is displayed as a slide -->
<ng-reveal slides="projects" c>
</ng-reveal>
</div>
</body>
</html>
```

## Documentation

***Coming Soon***

## Requirements

* [AngularJS](http://angularjs.org) v1.3.0 or newer
* [RevealJS](http://lab.hakim.se/reveal-js/#/) v3.0.0 or newer
