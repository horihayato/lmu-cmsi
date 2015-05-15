// JD: 9...Overall, the original code's spacing style is too tight.
ContactManager.module("AboutApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){ // JD: 6
  Show.Controller = {
    showAbout: function(){
      var view = new Show.Message();
      ContactManager.mainRegion.show(view);
    }
  };
});
