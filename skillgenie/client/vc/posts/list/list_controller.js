define(["app", "vc/posts/list/list_view"], function(Skillgenie, View){
  Skillgenie.module("TimelineApp.List", function(List, Skillgenie, Backbone, Marionette, $, _){
    List.Controller = {
      listPosts: function(criterion){
        require(["shared/views", "models/post_model", "models/goal_model"], function(CommonViews){
          var loadingView = new CommonViews.Loading();
          Skillgenie.mainRegion.show(loadingView);

          var fetchingGoals = Skillgenie.request("goal:entities");
          var fetchingPosts = Skillgenie.request("post:entities");

          var postsListLayout = new View.Layout();
          var postsListPanel = new View.Panel();

          require(["models/shared_models"], function(FilteredCollection){
            $.when(fetchingPosts).done(function(posts){

              var filteredPosts = Skillgenie.Entities.FilteredCollection({
                collection: posts,
                filterFunction: function(filterCriterion){
                  var criterion = filterCriterion.toLowerCase();
                  return function(post){
                    if(post.get('goalAssoc').toLowerCase().indexOf(criterion) !== -1){
                        return post;
                    }
                  };
                }
              });


            var parentGoal;
             $.when(fetchingGoals).done(function(goals){
                parentGoal = goals.where({slug: criterion});
             })

              if(criterion){
                filteredPosts.filter(criterion);
                postsListPanel.once("show", function(){
                  postsListPanel.triggerMethod("set:filter:criterion", criterion);
                });
              }

              var postsListView = new View.Posts({
                collection: filteredPosts
              });


              postsListPanel.on("posts:filter", function(filterCriterion){
                filteredPosts.filter(filterCriterion);
                Skillgenie.trigger("posts:filter", filterCriterion);
              });

              postsListLayout.on("show", function(){
                postsListLayout.panelRegion.show(postsListPanel);
                postsListLayout.displayRegion.show(postsListView);
              });

              postsListPanel.on("post:new", function(){
                require(["vc/posts/new/new_view"], function(NewView){
                  var newPost = new Skillgenie.Entities.Post()

                  var view = new NewView.Post({
                    model: newPost
                  });


                    view.on("form:submit", function(data){
                        if(posts.length > 0){

                          var highestId = _.max(posts.pluck('id'));
                          console.log("highestid is "+ highestId)
                          data.id = highestId + 1;

                          console.log(data);

                        }
                        else{
                          data.id = 1;
                        }

                        if(newPost.save(data)){
                          posts.add(newPost);
                          view.trigger("dialog:close");
                          var newPostView = postsListView.children.findByModel(newPost);

                          //temporary fix, patches up form/view "destroyed" weirdness
                          var slug = newPost.get("goalAssoc");
                          Skillgenie.trigger("posts:list", slug.substr(slug.length - 6));

                      if(newPostView){
                        newPostView.flash("success");
                      }
                    }
                    else{
                      console.log("WOAH,  should be validating entries")
                      //view.triggerMethod("form:data:invalid", newPost.validationError);
                    }
                  });

                  Skillgenie.dialogRegion.show(view);
                });
              });

              postsListView.on("childview:post:show", function(childView, args){
                Skillgenie.trigger("post:show", args.model.get("_id"));
              });

              postsListView.on("childview:post:edit", function(childView, args){
                require(["vc/posts/edit/edit_view"], function(EditView){
                  var model = args.model;
                  var view = new EditView.Post({
                    model: model
                  });

                  view.on("form:submit", function(data){
                    if(model.save(data)){
                      var slug = args.model.get("goalAssoc");
                      view.trigger("dialog:close");
                      
                      //temporary fix, patches up form/view "destroyed" weirdness
                      Skillgenie.trigger("posts:list", slug.substr(slug.length - 6));
                    }
                    else{
                      view.triggerMethod("form:data:invalid", model.validationError);
                    }
                  });

                  Skillgenie.dialogRegion.show(view);
                });
              });

              postsListView.on("childview:post:delete", function(childView, args){
                      //   var slug = args.model.get("goalAssoc");
                      // //temporary fix, patches up form/view "destroyed" weirdness
                      // Skillgenie.trigger("posts:list", slug.substr(slug.length - 6));
                args.model.destroy();
              });

              Skillgenie.mainRegion.show(postsListLayout);
            });
          });
        });
      }
    }
  });

  return Skillgenie.TimelineApp.List.Controller;
});
