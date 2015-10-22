define(["app", "d3", "d3.wordcloud"], function(Skillgenie, d3, d3wc){
	return {
		positiveWordCloud: function(data){

			var posWords = data["posWords"], //list is sized logarithmiscally limiting draw time for clous
				fontSize;

			var fill = d3.scale.category20();
			  d3.layout.cloud().size([2000, 1000])
			      .words(
			        posWords.map(function(d) {
				        return {text: d, value: data["posCounts"][d]};
				      }))
			      .padding(5)
			      .rotate(function() { return ~~(Math.random() * 2) * 90; })
			      .font("Palatino")
			      .fontSize(function(d) { 
				      	return d.value * 12; 
				      })
			      .on("end", draw)
			      .start();

			  function draw(words) {
			    d3.select("#posWordCloud").append("svg")
			        .attr("width", 1000)
			        .attr("height", 1000)
			      .append("g")
			        .attr("transform", "translate(150,150)")
			      .selectAll("text")
			        .data(words)
			      .enter().append("text")
			        .style("font-size", function(d) { return d.size + "px"; })
			        .style("font-family", "Palatino")
			        .style("fill", function(d, i) { return fill(i); })
			        .attr("text-anchor", "middle")
			        .attr("transform", function(d) {
			          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			        })
			        .text(function(d) { return d.text; });
			  }

		},

		negativeWordCloud: function(data){

			var negWords = data["negWords"], //list is sized logarithmiscally limiting draw time for clous
				fontSize;

			var fill = d3.scale.category20();
			  d3.layout.cloud().size([2000, 1000])
			      .words(
			        negWords.map(function(d) {
				        return {text: d, value: data["negCounts"][d]};
				      }))
			      .padding(5)
			      .rotate(function() { return ~~(Math.random() * 2) * 90; })
			      .font("Palatino")
			      .fontSize(function(d) { 
				      	return d.value * 12; 
				      })
			      .on("end", draw)
			      .start();

			  function draw(words) {
			    d3.select("#negWordCloud").append("svg")
			        .attr("width", 1000)
			        .attr("height", 1000)
			      .append("g")
			        .attr("transform", "translate(150,150)")
			      .selectAll("text")
			        .data(words)
			      .enter().append("text")
			        .style("font-size", function(d) { return d.size + "px"; })
			        .style("font-family", "Palatino")
			        .style("fill", function(d, i) { return fill(i); })
			        .attr("text-anchor", "middle")
			        .attr("transform", function(d) {
			          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			        })
			        .text(function(d) { return d.text; });
			  }

		}
	};
});
