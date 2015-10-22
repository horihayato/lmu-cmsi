define(["app", "vc/header/list/list_view"], function(Skillgenie, View){
  Skillgenie.module("HeaderApp.List", function(List, Skillgenie, Backbone, Marionette, $, _){
    List.Controller = {
      listHeader: function(){
        require(["models/header_model"], function(){
          var links = Skillgenie.request("header:entities");
          var headers = new View.Headers({collection: links});

          headers.on("brand:clicked", function(){
            Skillgenie.trigger("goals:list");
          });

          headers.on("childview:navigate", function(childView, model){
            var trigger = model.get("navigationTrigger");
            Skillgenie.trigger(trigger);
          });

          Skillgenie.headerRegion.show(headers);
        });
      },

      setActiveHeader: function(headerUrl){
        var links = Skillgenie.request("header:entities");
        var headerToSelect = links.find(function(header){ return header.get("url") === headerUrl; });
        headerToSelect.select();
        links.trigger("reset");
      }
    };
  });

  return Skillgenie.HeaderApp.List.Controller;
});
