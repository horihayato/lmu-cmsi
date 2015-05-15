ContactManager.module("AboutApp", function(AboutApp, ContactManager, Backbone, Marionette, $, _){ // JD: 9
  AboutApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "help" : "showAbout" // JD: 9
    }
  });

  var API = {
    showAbout: function(){ // JD: 9...Anyway, overall, the original code's spacing style is too tight.
      AboutApp.Show.Controller.showAbout();
      ContactManager.execute("set:active:header", "help");
    }
  };

  ContactManager.on("about:show", function(){
    ContactManager.navigate("help");
    API.showAbout();
  });

  ContactManager.addInitializer(function(){
    new AboutApp.Router({
      controller: API
    });
  });
});
