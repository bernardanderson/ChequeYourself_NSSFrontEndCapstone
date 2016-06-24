// This directive allows draggability, borrowed from:
//  https://siongui.github.io/2013/04/04/angularjs-draggable-movable-element/

app.directive('dragme', ['$document' , function($document) {
    return {
      restrict: 'A',
      link: function(scope, elm, attrs) {
        var startX, startY, initialMouseX, initialMouseY;
        elm.css({position: 'absolute'});

        elm.bind('mousedown', function($event) {
          startX = elm.prop('offsetLeft');
          startY = elm.prop('offsetTop');
          initialMouseX = $event.clientX;
          initialMouseY = $event.clientY;
          $document.bind('mousemove', mousemove);
          $document.bind('mouseup', mouseup);
          return false;
        });

        function mousemove($event) {
          var dx = $event.clientX - initialMouseX;
          var dy = $event.clientY - initialMouseY;
          elm.css({
            top:  startY + dy + 'px',
            left: startX + dx + 'px'
          });
          return false;
        }

        function mouseup() {
          $document.unbind('mousemove', mousemove);
          $document.unbind('mouseup', mouseup);
        }
      }
    };
  }]);





// app.directive('dragme', ['$document', function($document) {
//   return {
//     link: function(scope, element, attr) {
//       var startX = 0, startY = 0, x = 0, y = 0;

//       element.on('mousedown', function(event) {
//         // This prevents default dragging of selected content but I commented it out
//         //  because it blocks the editing of contentedited elements
//         // event.preventDefault();

//         var movingDiv = this.getBoundingClientRect();

//         startX = event.pageX - movingDiv.left;
//         startY = event.pageY - movingDiv.top;
//         $document.on('mousemove', mousemove);
//         $document.on('mouseup', mouseup);

//         console.log("top", top);
//         console.log("left", left);
//         console.log("click event", event)
//         console.log("click startx", startX)
//         console.log("click starty", startY)
//         console.log("click value x", x);
//         console.log("click value y", y);
//         console.log("click event.pageX", event.pageX);
//         console.log("click event.pageY", event.pageY);
//       });

//       function mousemove(event) {
//         y = event.pageY - startY-65;
//         x = event.pageX - startX;

//         // Keeps the objects from moving off screen to the left
//         x < 0 ? x = 0 : x = x;
//         y < 0 ? y = 0 : y = y;

//         console.log("move event", event)
//         console.log("move startx", startX)
//         console.log("move starty", startY)
//         console.log("move value x", x);
//         console.log("move value y", y);
//         console.log("move event.pageX", event.pageX);
//         console.log("move event.pageY", event.pageY);





//         element.css({
//           top: y + 'px',
//           left:  x + 'px'
//         });
//       }

//       function mouseup() {
//         $document.off('mousemove', mousemove);
//         $document.off('mouseup', mouseup);
//       }
//     }
//   };
// }]);