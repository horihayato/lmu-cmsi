define(["app",
        "text!templates/goal-menu/layout.handlebars",
        "text!templates/goal-menu/panel.handlebars",
        "text!templates/goal-menu/none.handlebars",
        "text!templates/goal-menu/list.handlebars",
        "text!templates/goal-menu/list_item.handlebars",
        "handlebars",
        "timeline"],
       function(Skillgenie, layoutTpl, panelTpl, noneTpl, listTpl, listItemTpl, Handlebars, timeline){
  Skillgenie.module("GoalMenuApp.List.View", function(View, Skillgenie, Backbone, Marionette, $, _){
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
        "click button.js-new": "goal:new"
      },

      events: {
        "submit #filter-form": "filterGoals"
      },

      ui: {
        criterion: "input.js-filter-criterion"
      },

      filterGoals: function(e){
        e.preventDefault();
        var criterion = this.$(".js-filter-criterion").val();
        this.trigger("goals:filter", criterion);
      },

      onSetFilterCriterion: function(criterion){
        this.ui.criterion.val(criterion);
      }
    });

    View.Goal = Marionette.ItemView.extend({
      tagName: "li",
      className: 'collection-item avatar',
      template: Handlebars.compile(listItemTpl),

      triggers: {
        "click a.js-show": "goal:show",
        "click a.js-view-timeline": "goal:view-timeline",
        "click a.js-view-metrics": "goal:view-metrics",
        "click a.js-edit": "goal:edit",
        "click button.js-delete": "goal:delete"
      },

      events: {
        "click": "highlightName"
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

    var NoGoalsView = Marionette.ItemView.extend({
      template: Handlebars.compile(noneTpl),
      tagName: "tr",
      className: "alert"
    });

    View.Goals = Marionette.CollectionView.extend({
      tagName: "ul",
      className: 'collection',
      childView: View.Goal,

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
      },

      onRenderCollection: function(){
        this.attachHtml = function(collectionView, childView, index){
          collectionView.$el.prepend(childView.el);
        }
      }
    });
  });

  return Skillgenie.GoalMenuApp.List.View;
});
