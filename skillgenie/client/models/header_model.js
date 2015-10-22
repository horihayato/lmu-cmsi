define(["app", "backbone.picky"], function(Skillgenie){
  Skillgenie.module("Entities", function(Entities, Skillgenie, Backbone, Marionette, $, _){
    Entities.Header = Backbone.Model.extend({
      initialize: function(){
        var selectable = new Backbone.Picky.Selectable(this);
        _.extend(this, selectable);
      }
    });

    Entities.HeaderCollection = Backbone.Collection.extend({
      model: Entities.Header,

      initialize: function(){
        var singleSelect = new Backbone.Picky.SingleSelect(this);
        _.extend(this, singleSelect);
      }
    });

    var initializeHeaders = function(){
      Entities.headers = new Entities.HeaderCollection([
        { name: "Timeline Menu", url: "goals", navigationTrigger: "goals:list" },
      ]);
    };

    var API = {
      getHeaders: function(){
        if(Entities.headers === undefined){
          initializeHeaders();
        }
        return Entities.headers;
      }
    };

    Skillgenie.reqres.setHandler("header:entities", function(){
      return API.getHeaders();
    });
  });

  return ;
});
