define(["app",
        "handlebars",
        "text!templates/header/list.handlebars",
        "text!templates/header/list_item.handlebars"],
        function(Skillgenie, Handlebars, listTpl, listItemTpl){
  Skillgenie.module("HeaderApp.List.View", function(View, Skillgenie, Backbone, Marionette, $, _){
    View.Header = Marionette.ItemView.extend({
      template: Handlebars.compile(listItemTpl),
      tagName: "li",

      events: {
        "click a": "navigate"
      },

      navigate: function(e){
        e.preventDefault();
        this.trigger("navigate", this.model);
      },

      onRender: function(){
        if(this.model.selected){
          // add class so Bootstrap will highlight the active entry in the navbar
          this.$el.addClass("active");
        };
      }
    });

    View.Headers = Marionette.CompositeView.extend({
      template: Handlebars.compile(listTpl),
      className: "navbar navbar-inverse navbar-fixed-top",
      childView: View.Header,
      childViewContainer: "ul",

      events: {
        "click a.brand": "brandClicked"
      },

      brandClicked: function(e){
        e.preventDefault();
        this.trigger("brand:clicked");
      }
    });
  });

  return Skillgenie.HeaderApp.List.View;
});
