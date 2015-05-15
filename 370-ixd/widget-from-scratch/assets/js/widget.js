//structure of code was inspired by "Content Timeline" by Shindiri Studio
//used this timeline for my Skillgenie project, figured their code was indicitive of "best practices"

//Multi-state slider buttons
//tried for the life of me to force cursor:pointer on the buttons to no avail

(function($) {

	var stateIndex = 0;
	var stateFlipped = false;
	var buttonLeft = 1;
  	var containWidth = 0;

	var methods = {
		init : function( options ) {

			this.data('multiSlide', options)

			var $this = this,
				data = $this.data('multiSlide');

			//defaults
	        var settings = $.extend({
	        	states: 
					{
						1: {
							text: "Default", 
							buttonColor: "#666699",
						},
					},
				confirmed: ".confirmed"

	        }, options );

	        //initialize if no data
	        if (!data){
     			$this.data('multiSlide', {
					states: 
					{
						1: {
							text: "Delete", 
							buttonColor: "#3498db"
						},

						2: {
							text: "Are you sure?",
							buttonColor: "#8e44ad"
						},

						3: {
							text: "One more time...",
							buttonColor: "#e67e22"
						},

						4: {
							text: "Goodbye cruel world!",
							buttonColor: "#7f8c8d"
						}
					},

					confirmed: "#confirmed"

				});
			}

			$this.wrap("<div class='btn multiSlide-large parentContain'></div>")
			$this.parent().css({"z-index": "-100", "margin-left": "0px"});
			$this.animate({left: 0}) //left justify

			containWidth = parseInt($this.parent().css("width"));


			$this.mousedown(function() {
  				$this.multiSlide('trackDrag', event)
			});

			//snap back
			$this.mouseup(function() {
  				$this.animate({left: 0})
  				stateFlipped = false;
			});

			$this.mousemove(function() {
  				$this.multiSlide('moveButton', event)
			});

			//initialize
			$this.multiSlide('changeState');

	        return this;
		},

		//parts adapted from dondi's boxes-touch
		trackDrag: function (event) {
          if (event.which === buttonLeft) {
              var deltaX,
                  deltaY,
                  off;

              if (event.target.id === "myButton") {
                off = $("#myButton").offset();
                this.deltaX = event.pageX - off.left;

                event.stopPropagation();

              }
              
          }
        },

        moveButton: function (event) {
          var containLeft = $(".parentContain").offset().left;
          if (event.which === buttonLeft) {

            if (event.pageX < containLeft + containWidth && event.pageX > containLeft) {
              $("#myButton").offset({
                left: event.pageX - this.deltaX
              });

                if (event.pageX > 175 && !stateFlipped) {
                	this.multiSlide('changeState'); 
		 			stateFlipped = true;
	            }

            }
          }
        },


		changeState : function() {
			var $this = this,
				data = $this.data('multiSlide'),
				parent = $this.parent();


			stateIndex++;	

			if(stateIndex == Object.keys(data.states).length){
				$(".text").remove();

				this.prepend("<span class='text'>" + data.states[stateIndex].text + "</span>");
				this.css({
					"background-color": data.states[stateIndex].buttonColor
				});

				$this.multiSlide('confirmed');

				return this;
			}

			$(".text").remove();

			this.prepend("<span class='text'>" + data.states[stateIndex].text + "</span>");
			this.css({
				"background-color": data.states[stateIndex].buttonColor
			});

			parent.prepend("<span class='text'>" +data.states[stateIndex+1].text+ "</span>")
			parent.css({
				"background-color": data.states[stateIndex+1].buttonColor
			});


	        return this;

		},

		confirmed : function() {
			var $this = this,
				data = $this.data('multiSlide'),
				parent = $this.parent(),
				con = data.confirmed;

			$(con).text("Confirmed, this function should be exposed so the user can manipulate the confirmation using jQuery");
		
	        return this;

		},


	};


	$.fn.multiSlide = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} 
	};

}(jQuery));
