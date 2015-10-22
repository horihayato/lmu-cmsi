define(["app", "vc/header/list/list_controller"], function(Skillgenie, ListController){
  Skillgenie.module("HeaderApp", function(Header, Skillgenie, Backbone, Marionette, $, _){
    var API = {
      listHeader: function(){
        ListController.listHeader();
      }
    };

    Skillgenie.commands.setHandler("set:active:header", function(name){
      ListController.setActiveHeader(name);
    });

    Header.on("start", function(){
      API.listHeader();
    });
  });

  return Skillgenie.HeaderApp;
});
