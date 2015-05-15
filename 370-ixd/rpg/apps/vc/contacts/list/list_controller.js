// JD: 9...Overall, the original code's spacing style is too tight.
ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  List.Controller = {
    listContacts: function(criterion){
      var loadingView = new ContactManager.Common.Views.Loading();
      ContactManager.mainRegion.show(loadingView);

      var fetchingContacts = ContactManager.request("contact:entities");

      var contactsListLayout = new List.Layout(); // JD: 6
      var contactsListPanel = new List.Panel();

      $.when(fetchingContacts).done(function(contacts){
        var filteredContacts = ContactManager.Entities.FilteredCollection({
          collection: contacts,
          filterFunction: function(filterCriterion){
            var criterion = filterCriterion.toLowerCase();
            return function(contact){
              if(contact.get("firstName").toLowerCase().indexOf(criterion) !== -1
                || contact.get("lastName").toLowerCase().indexOf(criterion) !== -1
                || contact.get("phoneNumber").toLowerCase().indexOf(criterion) !== -1){
                return contact;
              // JD: 13 (all the way to end of variable declaration.
            }
          };
        }
      });

        if(criterion){
          filteredContacts.filter(criterion);
          contactsListPanel.once("show", function(){
            contactsListPanel.triggerMethod("set:filter:criterion", criterion);
          });
        }

        var contactsListView = new List.Contacts({
          collection: filteredContacts
        });

        contactsListPanel.on("contacts:filter", function(filterCriterion){
          filteredContacts.filter(filterCriterion);
          ContactManager.trigger("contacts:filter", filterCriterion);
        });

        contactsListLayout.on("show", function(){
          contactsListLayout.panelRegion.show(contactsListPanel);
          contactsListLayout.contactsRegion.show(contactsListView);
        });


        contactsListPanel.on("contacts:item", function(){
          console.log("New item");
          var view;
          var newContact;

          var fetchingItem = ContactManager.request("contact:item");

          $.when(fetchingItem).done(function(item) {

              console.log("ITEM:")
              console.log(item)

              view = new ContactManager.ContactsApp.Display.Item({
                model: item
              });

            ContactManager.dialogRegion.show(view);

          });
        });



        contactsListPanel.on("contacts:new", function(random){
          console.log("Creating new contact" + random);
          var view;
          var newContact;

          var fetchingContact = ContactManager.request("contact:random");

          $.when(fetchingContact).done(function(contact) {
            if (!random){

              console.log("Attempting non random new");
              newContact = new ContactManager.Entities.Contact();

            } else {

              console.log("Attempting to randomize")
              newContact = contact;

            }

            // JD: 13
              view = new ContactManager.ContactsApp.New.Contact({
                model: newContact
              });

            view.on("form:submit", function(data){

              console.log(data);

              newContact.save(data, {type:'POST', url: 'http://lmu-diabolical.appspot.com/characters'});

              //Could put this in success:, but not working... :{
              setTimeout(function(){contacts.fetch(); console.log("Got the new stuff");}, 3000);

              view.trigger("dialog:close");

              var newContactView = contactsListView.children.findByModel(newContact);
              if(newContactView){
                newContactView.flash("success");
              }

              else{ // JD: 14
                view.triggerMethod("form:data:invalid", newContact.validationError);
              }
          }); // JD: 13

            ContactManager.dialogRegion.show(view);

          });



        });

contactsListView.on("childview:contact:show", function(childView, args){
  console.log(args.model);
  console.log(args.model.get("id"));
  ContactManager.trigger("contact:show", args.model.get("id")); 
});



contactsListView.on("childview:contact:edit", function(childView, args){
  var model = args.model;
  var view = new ContactManager.ContactsApp.Edit.Contact({
    model: model
  });

  view.on("form:submit", function(data){

    if(model.save(data)){
      console.log(data);
      //childView.render();
      view.trigger("dialog:close");
      childView.flash("success");
    }
    else{ // JD: 9, 14
      view.triggerMethod("form:data:invalid", model.validationError);
    }
  });

  view.on("form:randomize", function(){
    console.log("THE EDIT VIEW SHOULD NOT HAVE THIS BUTTON")
  });

  ContactManager.dialogRegion.show(view);
});

contactsListView.on("childview:contact:delete", function(childView, args){
  args.model.destroy();
});

ContactManager.mainRegion.show(contactsListLayout);
});
}
} // JD: 13 ...when you get a bunch of closing delimiters in the same position, you *know* you've indented wrong.
});
