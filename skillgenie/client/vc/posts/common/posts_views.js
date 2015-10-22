define(["app", "handlebars", "text!templates/timeline/post_form.handlebars","moment", "backbone.syphon"],
       function(Skillgenie, Handlebars, formHbs, moment){
  Skillgenie.module("TimelineApp.Common.Views", function(Views, Skillgenie, Backbone, Marionette, $, _){
    Views.Form = Marionette.ItemView.extend({
      template: Handlebars.compile(formHbs),

      events: {
        "click button.js-submit": "submitClicked",
        "click .learning-btn": "doLearning",
        "click #post-success": "checkBox",
      },

      onShow: function() {

        //initialize datepicker
        var startDate = this.$('#post-doc')

        require(['jquery', 'materialize'], function($) {

          this.$('.datepicker').pickadate({
            selectMonths: true,
            selectYears: 15, 
            onStart: function() { //datepicker display date is doc on edit
              startDate = startDate.val();

              if(startDate != ""){
                startDate = moment(startDate, "MM-DD-YYYY")
                startDate = startDate.format("YYYY-MM-DD")

                this.set('clear')
                this.set('select', startDate, { format: 'yyyy-mm-dd' })
              }

            }
          });
        });

        //initialize success checkbox
        var success = this.model.get("success")

        if (success) {
          this.$('#post-success').attr("checked", true)
          this.$('#post-success').trigger();
        }

      },


      submitClicked: function(e){
        e.preventDefault();
        var data = Backbone.Syphon.serialize(this),
            success = this.$('#post-success').attr("checked"),
            doc = moment(data["doc"]),
            today = moment();

        //some additional help for backbone.syphon
        success ? data["success"] = true : data["success"] = false
        data["difficulty"] = parseInt(this.$('.range-field .thumb .value').text())
        data["doc"] = doc.format("MM-DD-YYYY")

        if(this.model.get("timestamp") == 0) {
          data["timestamp"] = today.format("MM-DD-YYYY")
        }

        this.trigger("form:submit", data);
      },

      checkBox: function(e){ //because materialize's checkbox functionality doesn't work
        var attr = this.$('#post-success').attr('checked');

        if (typeof attr !== typeof undefined && attr !== false) {
          this.$('#post-success').attr("checked", false)
        } else {
          this.$('#post-success').attr("checked", true);
        }
      },

      doLearning: function(e){
        e.preventDefault();
        var theta,
            formData = Backbone.Syphon.serialize(this),
            rangeField = this.$('.range-field '),
            gradientFlash = this.$('#grad-outer'),
            diffSlider = this.$('#post-difficulty'),
            diffValue = this.$('.range-field .thumb .value'),
            model = this.model;

        require(["models/post_model"], function(){
              var regressionMetric = Skillgenie.request("post:enumerateMetric", "difficultyRegression");
              var descriptionMetric = Skillgenie.request("post:enumerateMetric", "descriptionClassifier", formData["description"]);

              $.when(regressionMetric).done(function(data){
                $.when(descriptionMetric).done(function(dm){

                  //FOR REGRESSION METRIC
                  theta = data.get("theta")

                  //if there is not a doc value or it is less than today then we need to block this
                  //fix the three press

                  //half-serialize, fetch timestamp and doc to compute days spent
                
                  var doc = moment(formData["doc"]),
                    stamp = moment(model.get("timestamp")),
                    today = moment();

                  if (typeof stamp == undefined) {
                    console.log("Created timestamp")
                    stamp = today
                  }

                  var ms = doc.diff(stamp);
                  var d = moment.duration(ms);
                  var duration = Math.floor(d.asDays());

                  //compute difficulty based on theta (x = (y-b)/m)
                  var toDiff = Math.floor((duration - theta[1])/theta[0])

                  console.log("Metric 1 Response: Difficulty score of " + toDiff + " based on " +duration+ " days")

                  //append to difficulty line (value, move the slider)
                  diffSlider.val(toDiff)
                  diffValue.text(toDiff)
                  diffSlider.hide().fadeIn();






                  //FOR CLASSIFICATION METRIC
                  classScores = dm.get("scores")
                  
                  if(classScores[0] > classScores[1]) { //Indicative of success, flash green

                    console.log("Metric 2 Response: Description indicative of success based on " + classScores[0] + " - " + classScores[1])

                    gradientFlash.fadeTo('slow', 0.3, function(){
                          $(this).css("background-color", "#rgba(156, 236, 121, 0.4)");
                      }).fadeTo('slow', 1);
                  } else { //Indicative of failure, flash red

                    console.log("Metric 2 Response: Description indicative of success based on " + classScores[0] + " - " + classScores[1])

                      gradientFlash.fadeTo('slow', 0.3, function(){
                          $(this).css("background-color", "#rgba(156, 236, 121, 0.4)");
                      }).fadeTo('slow', 1);
                  }

                });
              });
        });

      },

      onFormDataInvalid: function(errors){
        var $view = this.$el;

        var clearFormErrors = function(){
          var $form = $view.find("form");
          $form.find(".help-inline.error").each(function(){
            $(this).remove();
          });
          $form.find(".control-group.error").each(function(){
            $(this).removeClass("error");
          });
        }

        var markErrors = function(value, key){
          var $controlGroup = $view.find("#post-" + key).parent();
          var $errorEl = $("<span>", { class: "help-inline error", text: value });
          $controlGroup.append($errorEl).addClass("error");
        }

        clearFormErrors();
        _.each(errors, markErrors);
      }
    });
  });

  return Skillgenie.TimelineApp.Common.Views;
});
