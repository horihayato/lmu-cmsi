define(["marionette", "handlebars", "timeline", "d3", "moment", "chart", 
	"vc/metrics/show/visualization/metricOne.js", 
	"vc/metrics/show/visualization/metricTwo.js", 
	"text!templates/metrics/metrics.handlebars"], 
	function(Marionette, Handlebars, Timeline, d3, moment, Chart, mOne, mTwo, metricsHbs){
  return {
	Metrics: Marionette.ItemView.extend({
		tagName: "div",
		className: "metrics",
		template: Handlebars.compile(metricsHbs),

		onShow: function(){

			var regressionData = this.collection.at(0),
				descriptionData = this.collection.at(1);

			mOne.bestfitScatter(regressionData.toJSON());
			mTwo.positiveWordCloud(descriptionData.toJSON());
			//mTwo.negativeWordCloud(descriptionData.toJSON());
			
		}

	})
	}
})
