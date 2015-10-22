define(["app",
        "text!templates/timeline/layout.handlebars",
        "text!templates/timeline/panel.handlebars",
        "text!templates/timeline/none.handlebars",
        "text!templates/timeline/list.handlebars",
        "text!templates/timeline/list_item.handlebars",
        "handlebars",
        "timeline",
        "moment"],
       function(Skillgenie, layoutTpl, panelTpl, noneTpl, listTpl, listItemTpl, Handlebars, timeline, moment){
  Skillgenie.module("TimelineApp.List.View", function(View, Skillgenie, Backbone, Marionette, $, _){
    View.Layout = Marionette.LayoutView.extend({
      template: Handlebars.compile(layoutTpl),

      regions: {
        panelRegion: "#panel-region",
        displayRegion: "#display-region"
      }
    });

    View.Panel = Marionette.ItemView.extend({
      template: Handlebars.compile(panelTpl),

      triggers: {
        "click button.js-new": "post:new"
      },

      events: {
        "submit #filter-form": "filterPosts"
      },

      ui: {
        criterion: "input.js-filter-criterion"
      },

      filterPosts: function(e){
        e.preventDefault();
        var criterion = this.$(".js-filter-criterion").val();
        this.trigger("posts:filter", criterion);
      },

      onSetFilterCriterion: function(criterion){
        this.ui.criterion.val(criterion);
      }
    });

    View.Post = Marionette.ItemView.extend({
      tagName: "div",
      className: 'item',
      template: Handlebars.compile(listItemTpl),

      triggers: {
        "click a.js-show": "post:show",
        "click a.js-edit": "post:edit",
        "click button.js-delete": "post:delete"
      },

      events: {
        "click": "highlightName"
      },

      initialize: function(){

      $("#goalAssoc-header h4").text("\"" + this.model.get("goalAssoc") + "\"");

      var stamp = moment(this.model.get("timestamp"));

      this.$el.attr({
         "data-id": stamp.format("DD/MM/YYYY") ,
         "data-description": this.model.get("headline"),
       });
      },

      flash: function(cssClass){
        var $view = this.$el;
        $view.hide().toggleClass(cssClass).fadeIn(800, function(){
          setTimeout(function(){
            $view.toggleClass(cssClass)
          }, 500);
        });
      },

      highlightName: function(e){
        this.$el.toggleClass("warning");
      },

      remove: function(){
        var self = this;
        this.$el.fadeOut(function(){
          Marionette.ItemView.prototype.remove.call(self);
        });
      }
    });

    var NoPostsView = Marionette.ItemView.extend({
      template: Handlebars.compile(noneTpl),
      tagName: "tr",
      className: "alert"
    });

    View.Posts = Marionette.CollectionView.extend({
      tagName: "div",
      className: "timelineFlat tl1",
      childView: View.Post,

      //limited functionality
      collectionEvents: {
        'change': 'render'
      },

      initialize: function(){
        this.listenTo(this.collection, "reset", function(){
          this.attachHtml = function(collectionView, childView, index){
            collectionView.$el.append(childView.el);
          }
        });


        //timeline initialization must be delayed, html needs to render first
        setTimeout( function() {
            //timeline initialization
            $('.tl1').timeline({
              openTriggerClass : '.read_more',
              startItem : 'last',
              closeText : 'x',
              ajaxFailMessage: 'This ajax fail is made on purpose. You can add your own message here, just remember to escape single quotes if you\'re using them.'
            }); 

          }, 1000); 

        $('.tl1').draggable('disable');


      },

      onRenderCollection: function(){
        this.attachHtml = function(collectionView, childView, index){
          collectionView.$el.prepend(childView.el);
        }
      }
    });
  });

  return Skillgenie.TimelineApp.List.View;
});
