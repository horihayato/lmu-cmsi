define(["app", "vc/metrics/show/show_view"], function(Skillgenie, View){
	return {
		showMetrics: function(slug){
			require(["shared/views", "models/post_model"], function(CommonViews){

				var loadingView = new CommonViews.Loading();
          		Skillgenie.mainRegion.show(loadingView);

				//should run all metrics concurrently
				var regressionMetric = Skillgenie.request("post:enumerateMetric", "difficultyRegression");
				// var descriptionMetric = Skillgenie.request("post:enumerateMetric", "descriptionClassifier", "Formam primam corporalem, quam quidam corporeitatem vocant, lucem esse arbitror.Lux enim per se in omnem partem se ipsam diffundit, ita ut a puncto lucis sphaera lucis quamvis magna subito generetur, nisi obsistat umbrosum. Corporeitas vero est, quam de necessitate consequitur extensio materiae secundum tres dimensiones, cum tamen utraque, corporeitas scilicet et materia, sit substantia in se ipsa simplex, omni carens dimensione. Formam vero in se ipsa simplicem et dimensione carentem in materiam similiter simplicem et dimensione carentem dimensionem in omnem partem inducere fuit impossibile, nisi seipsam multiplicando et in omnem partem subito se diffundendo et in sui diffusione materiam extendendo, cum non possit ipsa forma materiam derelinquere, quia non est separabilis, nec potest ipsa materia a forma evacuari. Atqui lucem esse proposui, cuius per se est haec operatio, scilicet se ipsam multiplicare et in omnem partem subito diffundere. Quicquid igitur hoc opus facit, aut est ipsa lux, aut est hoc opus faciens in quantum participans ipsam lucem, quae hoc facit per se. Corporeitas ergo aut est ipsa lux, aut est dictum opus faciens et in materiam dimensiones inducens, in quantum participat ipsam lucem et agit per virtutem ipsius lucis. At vero formam primam in materiam dimensiones inducere per virtutem formae consequentis ipsam est impossibile. Non est ergo lux forma consequens ipsam corporeitatem, sed est ipsa corporeitas.");
				var descriptionMetric = Skillgenie.request("post:enumerateMetric", "descriptionClassifier");

	             $.when(regressionMetric).done(function(rm){

	             	$.when(descriptionMetric).done(function(dm){

	             		  var metrics = new Backbone.Collection;
	             		  metrics.add(rm)
	             		  metrics.add(dm)
	             	
			              var view = new View.Metrics({
			              	collection: metrics
			              });

			              Skillgenie.mainRegion.show(view);
	 				});
	            });
});
}
};
});
