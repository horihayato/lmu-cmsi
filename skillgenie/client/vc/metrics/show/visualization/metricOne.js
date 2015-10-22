define(["app", "d3"], function(Skillgenie, d3){
	return {
		bestfitScatter: function(data){

			var ori = data["original"],
				bf = data["bfLine"];
   
		    var margin = {top: 20, right: 15, bottom: 60, left: 20}
		      , width = 550 - margin.left - margin.right
		      , height = 450 - margin.top - margin.bottom;
		    
		    var x = d3.scale.linear()
		              .domain([0, d3.max(ori, function(d) { return d[0]; })])
		              .range([ 0, width ]);
		    
		    var y = d3.scale.linear()
		    	      .domain([0, d3.max(ori, function(d) { return d[1]; })])
		    	      .range([ height, 0 ]);
		 
		    var chart = d3.select('#regressionChart')
			.append('svg:svg')
			.attr('width', width + margin.right + margin.left)
			.attr('height', height + margin.top + margin.bottom)
			.attr('class', 'chart')

		    var main = chart.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
			.attr('width', width)
			.attr('height', height)
			.attr('class', 'main')   
		        
		    // draw the x axis
		    var xAxis = d3.svg.axis()
			.scale(x)
			.orient('bottom');

		    main.append('g')
			.attr('transform', 'translate(0,' + height + ')')
			.attr('class', 'main axis date')
			.call(xAxis);

			 main.append("text")
		      .attr("class", "label")
		      .attr("x", width)
		      .attr("y", height - 6)
		      .style("text-anchor", "end")
		      .text("Difficulty");

		    // draw the y axis
		    var yAxis = d3.svg.axis()
			.scale(y)
			.orient('left');

		    main.append('g')
			.attr('transform', 'translate(0,0)')
			.attr('class', 'main axis date')
			.call(yAxis);

			main.append("text")
		      .attr("class", "label")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 6)
		      .attr("dy", ".71em")
		      .style("text-anchor", "end")
		      .text("Days Spent");

		    var g = main.append("svg:g"); 
		    
		    g.selectAll("scatter-dots")
		      .data(ori)
		      .enter().append("svg:circle")
		          .attr("cx", function (d,i) { return x(d[0]); } )
		          .attr("cy", function (d) { return y(d[1]); } )
		          .attr("r", 3.5);

		    main.append('line')
			    .attr('x1',x(bf[0]))
			    .attr('y1',y(bf[1]))
			    .attr('x2',x(bf[2]))
			    .attr('y2',y(bf[3]))

		}
	};
});
