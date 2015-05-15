var ContactManager = new Marionette.Application(); // JD: 6

ContactManager.addRegions({
  headerRegion: "#header-region",
  mainRegion: "#main-region",
  dialogRegion: Marionette.Region.Dialog.extend({
    el: "#dialog-region"
  })
});

ContactManager.navigate = function(route,  options){ // JD: 9
  options || (options = {}); // JD: 10
  Backbone.history.navigate(route, options);
};

ContactManager.getCurrentRoute = function(){
  return Backbone.history.fragment
};

ContactManager.on("start", function(){
  if(Backbone.history){
    Backbone.history.start();

    if(this.getCurrentRoute() === ""){ // JD: 11
      ContactManager.trigger("contacts:list");
    }
  }
});
