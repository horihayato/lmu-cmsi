define(["app", "vc/posts/common/posts_views"], function(Skillgenie, CommonViews){
  Skillgenie.module("TimelineApp.New.View", function(View, Skillgenie,  Backbone, Marionette, $, _){
    View.Post = CommonViews.Form.extend({
      title: "New Post",

      onRender: function(){
       
        this.$(".js-submit").text("Create post");
      }
    });
  });

  return Skillgenie.TimelineApp.New.View;
});
