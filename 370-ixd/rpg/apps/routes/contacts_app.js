// JD: 9...Overall, the original code's spacing style is too tight.
ContactManager.module("ContactsApp", function(ContactsApp, ContactManager, Backbone, Marionette, $, _){
  ContactsApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "characters(/filter/criterion::criterion)": "listContacts", // JD: 6 (etc. etc.)
      "characters/:id": "showContact",
      "characters/:id/edit": "editContact"
    }
  });

  var API = {
    listContacts: function(criterion){
      ContactsApp.List.Controller.listContacts(criterion);
      ContactManager.execute("set:active:header", "characters");
    },

    showContact: function(id){
      ContactsApp.Show.Controller.showContact(id);
      ContactManager.execute("set:active:header", "characters");
    },

    editContact: function(id){
      ContactsApp.Edit.Controller.editContact(id);
      ContactManager.execute("set:active:header", "characters");
    }
  };

  ContactManager.on("contacts:list", function(){
    ContactManager.navigate("characters");
    API.listContacts();
  });

  ContactManager.on("contacts:filter", function(criterion){
    if(criterion){
      ContactManager.navigate("characters/filter/criterion:" + criterion);
    }
    else{
      ContactManager.navigate("characters");
    }
  });

  ContactManager.on("contact:show", function(id){
    ContactManager.navigate("characters/" + id);
    API.showContact(id);
  });

  ContactManager.on("contact:edit", function(id){
    ContactManager.navigate("characters/" + id + "/edit");
    API.editContact(id);
  });

  ContactManager.addInitializer(function(){
    new ContactsApp.Router({
      controller: API
    });
  });
});
