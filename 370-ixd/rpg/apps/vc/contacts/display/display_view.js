ContactManager.module("ContactsApp.Display", function(Display, ContactManager, Backbone, Marionette, $, _){
  Display.Item = ContactManager.ContactsApp.Common.Views.Popover.extend({
  	title: "New Item Spawned!",
  });
});
