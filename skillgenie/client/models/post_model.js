define(["app"], function(Skillgenie){
  Skillgenie.module("Entities", function(Entities, Skillgenie, Backbone, Marionette, $, _){
    Entities.Post = Backbone.Model.extend({
      idAttribute: "_id",
      urlRoot: "/api/posts/",

      defaults: {
        id: "",
        goalAssoc: "",
        doc: "",
        timestamp: 0,
        headline: "",
        description: "",
        success: false,

        difficulty: 0,
        priority: ""
      },

      parse : function(res,xhr) { 
        if (_.isObject(res[0])) {
           return res[0];
       } else {
           return res;
       }
      }

      // validate: function(attrs, options) {
      //   var errors = {}
      //   if (! attrs.firstName) {
      //     errors.firstName = "can't be blank";
      //   }

      //   if (! attrs.lastName) {
      //     errors.lastName = "can't be blank";
      //   }
      //   else{
      //     if (attrs.lastName.length < 2) {
      //       errors.lastName = "is too short";
      //     }
      //   }

      //   if( ! _.isEmpty(errors)){
      //     return errors;
      //   }
      // }
    });

    Entities.MetricData = Backbone.Model.extend({
      idAttribute: "algo",
      urlRoot: "/api/metrics/",

      initialize: function(attributes, options) {
        this.data = options.data;
      },

      parse : function(res,xhr) { 
        if (_.isObject(res[0])) {
           return res[0];
       } else {
           return res;
      }
    }

    });

    Entities.PostCollection = Backbone.Collection.extend({
      url: "/api/posts/",
      model: Entities.Post,
      comparator: "timestamp",

    });

    var API = {
      getPostEntities: function(){
        var posts = new Entities.PostCollection();
        var defer = $.Deferred();
        posts.fetch({
          success: function(data){
            defer.resolve(data);
          }
        });
        var promise = defer.promise();
        $.when(promise).done(function(posts){
          if(posts.length === 0){
            posts.reset(models);
          }
        });
        return promise;
      },

      getMetricData: function(metricAlgo, d){
        var mData = new Entities.MetricData({algo: metricAlgo}, {data: d});
        var defer = $.Deferred();
        mData.fetch({
          data: { data: d },
          processData: true,
          success: function(data){
            defer.resolve(data);
          }
        });
        var promise = defer.promise();
        $.when(promise).done(function(mData){
          if(mData.length === 0){
            mData.reset(models);
          }
        });
        return promise;
      },

      getPostEntity: function(postId){
        var post = new Entities.Post({_id: postId});
        var defer = $.Deferred();
          post.fetch({
            success: function(data){
              defer.resolve(data);
            },
            error: function(data){
              defer.resolve(undefined);
            }
          });
        return defer.promise();
      }
    };

    Skillgenie.reqres.setHandler("post:entities", function(){
      return API.getPostEntities();
    });

    Skillgenie.reqres.setHandler("post:enumerateMetric", function(algo, data){
      return API.getMetricData(algo, data);
    });

    Skillgenie.reqres.setHandler("post:entity", function(id){
      return API.getPostEntity(id);
    });
  });

  return;
});
