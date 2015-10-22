define(["app", "vc/posts/edit/edit_view"], function(Skillgenie, View){
  Skillgenie.module("TimelineApp.Edit", function(Edit, Skillgenie, Backbone, Marionette, $, _){
    Edit.Controller = {
      editPost: function(id){
        require(["shared/views", "models/post_model"], function(CommonViews){
          var loadingView = new CommonViews.Loading({
            title: "Artificial Loading Delay",
            message: "Data loading is delayed to demonstrate using a loading view."
          });
          Skillgenie.mainRegion.show(loadingView);

          var fetchingPost = Skillgenie.request("post:entity", id);
          $.when(fetchingPost).done(function(post){
            var view;
            if(post !== undefined){
              view = new View.Post({
                model: post,
                generateTitle: true
              });

              view.on("form:submit", function(data){
                if(post.save(data)){
                  Skillgenie.trigger("post:show", post.get('_id'));
                }
                else{
                  view.triggerMethod("form:data:invalid", post.validationError);
                }
              });
            }
            else{
              view = new Skillgenie.TimelineApp.Show.MissingPost();
            }

            Skillgenie.mainRegion.show(view);
          });
        });
      }
    };
  });

  return Skillgenie.TimelineApp.Edit.Controller;
});
