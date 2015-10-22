define(["app", "vc/posts/show/show_view"], function(Skillgenie, View){
  Skillgenie.module("TimelineApp.Show", function(Show, Skillgenie, Backbone, Marionette, $, _){
    Show.Controller = {
      showPost: function(id){
        require(["shared/views", "models/post_model"], function(CommonViews){
          var loadingView = new CommonViews.Loading({
            title: "Artificial Loading Delay",
            message: "Data loading is delayed to demonstrate using a loading view."
          });
          Skillgenie.mainRegion.show(loadingView);

          var fetchingPost = Skillgenie.request("post:entity", id);
          $.when(fetchingPost).done(function(post){
            var postView;
            if(post !== undefined){
              postView = new View.Post({
                model: post
              });

              postView.on("post:edit", function(post){
                Skillgenie.trigger("post:edit", post.get("_id"));
              });
            }
            else{
              postView = new View.MissingPost();
            }

            Skillgenie.mainRegion.show(postView);
          });
        });
      }
    }
  });

  return Skillgenie.TimelineApp.Show.Controller;
});
