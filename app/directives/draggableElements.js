// This directive allows draggability, borrowed and modified from:
//  https://docs.angularjs.org/guide/directive#creating-a-directive-that-adds-event-listeners
app.directive('dragme', ['$document', function($document) {
  return {
    link: function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;

      element.on('mousedown', function(event) {
        // This prevents default dragging of selected content but I commented it out
        //  because it blocks the editing of contentedited elements
        // event.preventDefault();

        var movingDiv = this.getBoundingClientRect()

        startX = event.pageX - movingDiv.left;
        startY = event.pageY - movingDiv.top;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);

        console.log("click event", event)
        console.log("click startx", startX)
        console.log("click starty", startY)
        console.log("click value x", x);
        console.log("click value y", y);
        console.log("click event.pageX", event.pageX);
        console.log("click event.pageY", event.pageY);
      });

      function mousemove(event) {
        y = event.pageY - startY-65;
        x = event.pageX - startX;

        // Keeps the objects from moving off screen to the left
        x < 0 ? x = 0 : x = x;
        y < 0 ? y = 0 : y = y;

        console.log("move event", event)
        console.log("move startx", startX)
        console.log("move starty", startY)
        console.log("move value x", x);
        console.log("move value y", y);
        console.log("move event.pageX", event.pageX);
        console.log("move event.pageY", event.pageY);





        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }
    }
  };
}]);