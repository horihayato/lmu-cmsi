// JD: 9...Overall, the original code's spacing style is too tight.
ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){
  Show.Controller = {
    showContact: function(id){ // JD: 6
      var loadingView = new ContactManager.Common.Views.Loading({
        title: "Artificial Loading Delay",
        message: "Data loading is delayed to demonstrate using a loading view."
      });
      ContactManager.mainRegion.show(loadingView);

      var fetchingContact = ContactManager.request("contact:entity", id);
      $.when(fetchingContact).done(function(contact){
        var contactView;
        if(contact !== undefined){ // JD: 11
          contactView = new Show.Contact({
            model: contact
          });


          contactView.on("contact:edit", function(contact){
            ContactManager.trigger("contact:edit", contact.get("id"));
          });
        }
        else{ // JD: 14, 9
          contactView = new Show.MissingContact();
        }

        ContactManager.mainRegion.show(contactView);
      });
    }
  }
});
