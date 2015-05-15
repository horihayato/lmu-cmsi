ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){ // JD: 6
  Entities.Contact = Backbone.Model.extend({
    urlRoot: "http://lmu-diabolical.appspot.com/characters",

    defaults: {
      name: "",
      classType: "",
      gender: "",
      level: "",
      money: ""
    },
  });



Entities.RandomContact = Backbone.Model.extend({
    urlRoot: "http://lmu-diabolical.appspot.com/characters/spawn",

    defaults: {
      name: "",
      classType: "",
      gender: "",
      level: "",
      money: ""
    },

    parse : function(res,xhr) { 
      if (_.isObject(res[0])) { // JD: 12
         return res[0];
     } else {
         return res;
     }
      //using parse to get "0:" elements that come back from server
    },

  });


Entities.Item = Backbone.Model.extend({
    urlRoot: "http://lmu-diabolical.appspot.com/items/spawn",

    parse : function(res,xhr) { 
      if (_.isObject(res[0])) { // JD: 12
         return res[0];
     } else {
         return res;
     }
      //using parse to get "0:" elements that come back from server
    },

  });

  Entities.ContactCollection = Backbone.Collection.extend({
    url: "http://lmu-diabolical.appspot.com/characters",
    model: Entities.Contact,
    comparator: "id",

  });

  var API = {
    getContactEntities: function(){
      var contacts = new Entities.ContactCollection();
      var defer = $.Deferred();
      contacts.fetch({
        success: function(data){
          defer.resolve(data);
        }
      });
      var promise = defer.promise();
      $.when(promise).done(function(contacts){
        if(contacts.length === 0){ // JD: 11
          // if we don't have any contacts yet, create some for convenience
          var models = initializeContacts();
          contacts.reset(models);
        }
      });
      return promise;
    },

    getRandomContact: function(){
      var contact = new Entities.RandomContact();
      var defer = $.Deferred();
        contact.fetch({
          success: function(data){

            console.log( "successfully fetched a random contact: " + "\n" );
            console.log(data);

            defer.resolve(data);
          },
          error: function(data){
            defer.resolve(undefined);
          }
        });
      return defer.promise();
    },

    getItem: function(){
      var contact = new Entities.Item();
      var places = Array("Coif", "Helm", "Gorget", "Hauberk", "Cuirass", "Spaulders", "Vambrace", "Gauntlets", "Greaves", "Sabatons", "Doublet");

      console.log(contact);

      var defer = $.Deferred();
        contact.fetch({
          data: {
            level: (Math.floor(Math.random() * 99) + 1),
            slot: places[Math.floor(Math.random()*places.length)]
          },
          processData: true,
          success: function(data){

            console.log( "successfully fetched an item: " + "\n" );
            console.log(data);

            defer.resolve(data);
          },
          error: function(data){
            defer.resolve(undefined);
          }
        });
      return defer.promise();
    },

    getContactEntity: function(contactId){
      var contact = new Entities.Contact({id: contactId});
      var defer = $.Deferred();
        contact.fetch({
          success: function(data){

            console.log( "successfully fetched an existing contact: " + contactId + "\n" );
            console.log(data);

            defer.resolve(data);
          },
          error: function(data){
            defer.resolve(undefined);
          }
        });
      return defer.promise();
    }
  };

  ContactManager.reqres.setHandler("contact:entities", function(){
    return API.getContactEntities();
  });

      ContactManager.reqres.setHandler("contact:item", function(){
    return API.getItem();
  });

    ContactManager.reqres.setHandler("contact:random", function(){
    return API.getRandomContact();
  });

  ContactManager.reqres.setHandler("contact:entity", function(id){
    return API.getContactEntity(id);
  });
});
