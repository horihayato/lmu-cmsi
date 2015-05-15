// JD: 9...Overall, the original code's spacing style is too tight.
ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  List.Layout = Marionette.LayoutView.extend({
    template: "#contact-list-layout", // JD: 6

    regions: {
      panelRegion: "#panel-region",
      contactsRegion: "#contacts-region"
    }
  });

  List.Panel = Marionette.ItemView.extend({
    template: "#contact-list-panel",

    events: {
      "submit #filter-form": "filterContacts",
      "click button.js-new": "nonRandomNew",
      "click button.js-randomize": "randomNew",
      "click button.js-item": "getItem"
    },

    ui: {
      criterion: "input.js-filter-criterion"
    },

    getItem: function(e){
      e.preventDefault();
      this.trigger("contacts:item");
    },

    nonRandomNew: function(e){
      e.preventDefault();
      this.trigger("contacts:new", false);
    },

    randomNew: function(e){
      e.preventDefault();
      this.trigger("contacts:new", true);
    },

    filterContacts: function(e){
      e.preventDefault();
      var criterion = this.$(".js-filter-criterion").val();
      this.trigger("contacts:filter", criterion);
    },

    onSetFilterCriterion: function(criterion){
      this.ui.criterion.val(criterion);
    }
  });

  List.Contact = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#contact-list-item",

    triggers: {
      "click td a.js-show": "contact:show",
      "click td a.js-edit": "contact:edit",
      "click button.validated": "contact:delete"
    },

    events: {
      "click td.title": "highlightName",
      "click button.js-delete": "deleteValidation"
    },

    flash: function(cssClass){
      var $view = this.$el;
      $view.hide().toggleClass(cssClass).fadeIn(800, function(){
        setTimeout(function(){
          $view.toggleClass(cssClass)
        }, 500);
      });
    },

    deleteValidation: function(e){
      var delbtn = this.$el.find(".js-delete");
      if (!delbtn.hasClass("validated")) {
        delbtn.addClass("validated")
        delbtn.addClass("btn-danger")
        delbtn.text("Delete (Are you sure?)");
      } 

    },

    highlightName: function(e){
          this.$el.toggleClass("warning");
          this.$el.find(".btn").toggleClass("hide")
    },

    remove: function(){
      var self = this;
      this.$el.fadeOut(function(){
        Marionette.ItemView.prototype.remove.call(self);
      });
    }
  });

  var NoContactsView = Marionette.ItemView.extend({
    template: "#contact-list-none",
    tagName: "tr",
    className: "alert"
  });

  List.Contacts = Marionette.CompositeView.extend({
    tagName: "table",
    className: "table table-hover",
    template: "#contact-list",
    emptyView: NoContactsView,
    childView: List.Contact,
    childViewContainer: "tbody",

    //limited functionality
    collectionEvents: {
        'change': 'render' // JD: 8
    },

    initialize: function(){
      this.listenTo(this.collection, "reset", function(){
        this.attachHtml = function(collectionView, childView, index){
          collectionView.$el.append(childView.el);
        }
      });
    },

    onRenderCollection: function(){
      this.attachHtml = function(collectionView, childView, index){
        collectionView.$el.prepend(childView.el);
      }
    }
  });
});
