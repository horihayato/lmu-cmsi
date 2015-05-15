// JD: 9...Overall, the original code's spacing style is too tight.
ContactManager.module("ContactsApp.New", function(New, ContactManager, Backbone, Marionette, $, _){
  New.Contact = ContactManager.ContactsApp.Common.Views.Form.extend({ // JD: 6
    title: "New Character",

    onRender: function(){
      this.$(".js-submit").text("Create character");
    }
  });
});
