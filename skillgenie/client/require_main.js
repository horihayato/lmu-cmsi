requirejs.config({
  baseUrl: ".",
  paths: {
    backbone: "vendor/backbone",
    "backbone.picky": "vendor/backbone.picky",
    "backbone.syphon": "vendor/backbone.syphon",
    jquery: "vendor/jquery",
    "jquery-ui": "vendor/jquery-ui",
    "jquery.easing": "vendor/jquery.easing",
    "timeline": "vendor/jquery.timeline",
    "materialize":"vendor/materialize/bin/materialize",
      "picker":"vendor/materialize/date_picker/picker",
      "picker.date":"vendor/materialize/date_picker/picker.date",
      "hammerjs":"vendor/materialize/hammer.min",
      "velocity":"vendor/materialize/velocity.min",
    json2: "vendor/json2",
    localstorage: "vendor/backbone.localstorage",
    marionette: "vendor/backbone.marionette",
    handlebars: "vendor/handlebars",
    "chart": "vendor/chart",
    "moment": "vendor/moment",
    spin: "vendor/spin",
    "spin.jquery": "vendor/spin.jquery",
    text: "vendor/text",
    tpl: "vendor/underscore-tpl",
    d3: "vendor/d3",
    "d3.wordcloud": "vendor/d3.layout.cloud",
    underscore: "vendor/underscore"
  },

  shim: {
    underscore: {
      exports: "_"
    },
    d3: {
      exports: 'd3'
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    backbone: {
      deps: ["jquery", "underscore", "json2"],
      exports: "Backbone"
    },
    "backbone.picky": ["backbone"],
    "backbone.syphon": ["backbone"],
    marionette: {
      deps: ["backbone"],
      exports: "Marionette"
    },
    "jquery-ui": ["jquery"],
    localstorage: ["backbone"],
    "moment": ["jquery"],
    "jquery.easing": ["jquery", "jquery-ui"],
    "timeline": ["jquery", "jquery.easing", "jquery-ui"],
    "materialize": {
      deps: ["jquery", "hammerjs", "velocity", "picker.date"]
    },
    "d3.wordcloud": {
      deps: ["d3"]
    },
      "picker": ["jquery"],
      "picker.date": ["picker"],

  }
});

require(["app", "routes/header_routes"], function(Skillgenie){
  Skillgenie.start();
});
