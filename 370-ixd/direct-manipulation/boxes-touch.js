$(function () {

    var touches = {},
        drawingArea = $("#drawing-area"), // JD: 2
        newDrawBox= "<div class='box'></div>"; // JD: 3, 4


    window.BoxesTouch = {

        /**
         * Sets up the given jQuery collection as the drawing area(s).
         */
        setDrawingArea: function (jQueryElements) {
            // Set up any pre-existing box elements for touch behavior.
            jQueryElements
                .addClass("drawing-area")
                
                // Event handler setup must be low-level because jQuery
                // doesn't relay touch-specific event properties.
                .each(function (index, element) {
                    element.addEventListener("touchstart", BoxesTouch.newBox, false);
                    element.addEventListener("touchmove", BoxesTouch.trackDrag, false);
                    element.addEventListener("touchend", BoxesTouch.endDrag, false);
                })

                .find("div.box").each(function (index, element) {
                    element.addEventListener("touchstart", BoxesTouch.startMove, false);
                    element.addEventListener("touchend", BoxesTouch.unhighlight, false);
                });
        },


        newBox: function (event) {
            $.each(event.changedTouches, function(index, touch) {
                var touchEvent = {};

                touches[touch.identifier] = touchEvent;
                touchEvent.initialX = touch.pageX;
                touchEvent.initialY = touch.pageY;

                var renderedBox = $(newDrawBox).css({
                        left: touch.pageX + "px",
                        top: touch.pageY + "px"
                }); // JD: 5

                drawingArea.append(renderedBox);
                touchEvent.creation = $("div div:last-child");

                drawingArea.find("div.box").each(function (index, element) {
                    element.addEventListener("touchstart", BoxesTouch.startMove, false);
                    element.addEventListener("touchend", BoxesTouch.unhighlight, false);
                });


            });

            event.stopPropagation();
        },

        /**
         * Tracks a box as it is rubberbanded or moved across the drawing area.
         */
        trackDrag: function (event) {
            $.each(event.changedTouches, function (index, touch) {
                event.preventDefault();

                 var touchEvent = touches[touch.identifier];

                // Don't bother if we aren't tracking anything.
                if (touch.target.movingBox) {

                    var parent = $(touch.target.movingBox).parent(),
                        xLimit = touch.pageX - touch.target.deltaX,
                        yLimit = touch.pageY - touch.target.deltaY


                    if (xLimit > parent.offset().left + parent.width() ||
                        xLimit <= parent.offset().left ||
                        yLimit >= parent.offset().top + parent.height() ||
                        yLimit <= parent.offset().top) {
                        // JD: 6
                        touch.target.movingBox.css("background-color", "red")
                    } // JD: 12


                    // Reposition the object.
                    touch.target.movingBox.offset({
                        left: touch.pageX - touch.target.deltaX,
                        top: touch.pageY - touch.target.deltaY
                    });


                }

                if (touchEvent && touchEvent.creation) {
                    var createLeft, createWidth;
                    var th = createTopHeight(touch, touchEvent);

                    if (touch.pageX <= touchEvent.initialX) {
                        createLeft = touch.pageX;
                        createWidth = touchEvent.initialX - touch.pageX;
                    } else {
                        createLeft = touchEvent.initialX;
                        createWidth = touch.pageX - touchEvent.initialX;
                    }

                    touchEvent.creation.offset({
                        left: createLeft,
                        top: th.top
                    })

                    touchEvent.creation.width(createWidth);
                    touchEvent.creation.height(th.height);
                }

            });
            
            // Don't do any touch scrolling.
            event.preventDefault();
        },

        /**
         * Concludes a drawing or moving sequence.
         */
        endDrag: function (event) {
            $.each(event.changedTouches, function (index, touch) {
                if (touch.target.movingBox) {
                    // JD: 7
                    if(touch.target.movingBox.css('background-color') == "rgb(255, 0, 0)") { // JD: 3, 8
                        touch.target.movingBox.remove();
                    }

                    // Change state to "not-moving-anything" by clearing out
                    // touch.target.movingBox.
                    touch.target.movingBox = null;
                }

                // JD: 9
            });
        },

        /**
         * Indicates that an element is unhighlighted.
         */
        unhighlight: function () {
            $(this).removeClass("box-highlight");
        },

        /**
         * Begins a box move sequence.
         */
        startMove: function (event) {
            $.each(event.changedTouches, function (index, touch) {
                // Highlight the element.
                $(touch.target).addClass("box-highlight");

                // Take note of the box's current (global) location.
                var jThis = $(touch.target),
                    startOffset = jThis.offset();

                // Set the drawing area's state to indicate that it is
                // in the middle of a move.
                touch.target.movingBox = jThis;
                touch.target.deltaX = touch.pageX - startOffset.left;
                touch.target.deltaY = touch.pageY - startOffset.top;
            });

            // Eat up the event so that the drawing area does not
            // deal with it.
            event.stopPropagation();
        }

    };

    // JD: 10
    function createTopHeight (touch, touchEvent) {
        // JD: 11
        var createTop, createHeight;

        if (touch.pageY <= touchEvent.initialY) {
            createTop = touch.pageY;
            createHeight = touchEvent.initialY - touch.pageY;
        } else {
            createTop = touchEvent.initialY;
            createHeight = touch.pageY - touchEvent.initialY;
        }

        return {height: createHeight, top: createTop};
    }

});
