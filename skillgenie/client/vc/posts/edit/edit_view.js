define(["app", "vc/posts/common/posts_views"], function(Skillgenie, CommonViews){
  Skillgenie.module("TimelineApp.Edit.View", function(View, Skillgenie, Backbone, Marionette, $, _){
    View.Post = Skillgenie.TimelineApp.Common.Views.Form.extend({
    initialize: function(){
      this.title = "Edit " + this.model.get("headline");

    },


    onRender: function(){
      if(this.options.generateTitle){
        var $title = $('<h1>', { text: this.title });
        this.$el.prepend($title);
      }

      this.$(".js-submit").text("Update post");
    }
    });
  });

  return Skillgenie.TimelineApp.Edit.View;
});
