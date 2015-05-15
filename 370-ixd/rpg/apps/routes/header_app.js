// JD: 9...Overall, the original code's spacing style is too tight.
ContactManager.module("HeaderApp", function(Header, ContactManager, Backbone, Marionette, $, _){ // JD: 9
  var API = {
    listHeader: function(){ // JD: 9
      Header.List.Controller.listHeader();
    }
  };

  ContactManager.commands.setHandler("set:active:header", function(name){
    ContactManager.HeaderApp.List.Controller.setActiveHeader(name);
  });

  Header.on("start", function(){ // JD: 9
    API.listHeader();
  });
});
