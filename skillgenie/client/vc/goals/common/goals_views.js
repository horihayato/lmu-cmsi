define(["app", "handlebars", "text!templates/goal-menu/goal_form.handlebars", "moment", "backbone.syphon"],
       function(Skillgenie, Handlebars, formHbs, moment){
  Skillgenie.module("GoalMenuApp.Common.Views", function(Views, Skillgenie, Backbone, Marionette, $, _){
    Views.Form = Marionette.ItemView.extend({
      template: Handlebars.compile(formHbs),

      events: {
        "click button.js-submit": "submitClicked",
        "click #goal-success": "checkBox",
      },


      //ADD SLUG GENERATION


      onShow: function() {

        //initialize datepicker
        var startDate = this.$('#goal-doc')

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
          this.$('#goal-success').attr("checked", true)
          this.$('#goal-success').trigger();
        }

      },


      submitClicked: function(e){
        e.preventDefault();
        var data = Backbone.Syphon.serialize(this),
            success = this.$('#goal-success').attr("checked"),
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
        var attr = this.$('#goal-success').attr('checked');

        if (typeof attr !== typeof undefined && attr !== false) {
          this.$('#goal-success').attr("checked", false)
        } else {
          this.$('#goal-success').attr("checked", true);
        }
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
          var $controlGroup = $view.find("#goal-" + key).parent();
          var $errorEl = $("<span>", { class: "help-inline error", text: value });
          $controlGroup.append($errorEl).addClass("error");
        }

        clearFormErrors();
        _.each(errors, markErrors);
      }
    });
  });

  return Skillgenie.GoalMenuApp.Common.Views;
});
