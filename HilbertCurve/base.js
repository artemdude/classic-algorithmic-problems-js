function HilbertCurve(canvasId){
   var canvas = document.getElementById(canvasId),
       ctx = canvas.getContext("2d"),
       minLevel = 1,
       maxLevel = 10,
       curveLineLength = 0,
       curveLineWidth = 1,
       curveLineColor = '#FF0000',
       gridLineColor = '#EEEEEE',
       gridLineWidth = 1,
       curvePenPosition = 0;
   
   function Point(x, y) {
        this.X = x;
        this.Y = y;
    }
    
    var Direction = {
        Left: 0,
        Right: 1,
        Up: 2,
        Down: 3
    };
    
    this.draw = function(level){
        if(isNaN(level) || (level < minLevel || level > maxLevel)){
            alert('Level should be between ' + minLevel + ' and ' + maxLevel + '!');
        }
        else{
            var startPoint = new Point(0, 0);
            
            //clear canvas
            canvas.width = canvas.width;
                    
            curveLineLength = calculateCurveLineLength(level);
            drawGrid(curveLineLength, canvas.width, startPoint);
            curvePenPosition = startPoint;
            a(level);
        }
    };

    function calculateCurveLineLength(level){
        return canvas.width / (level * 3 + level - 1);
    }
    
    function a(level){
        if(level > 0){
            d(level - 1);
            drawLineTo(Direction.Right);
            a(level - 1);
            drawLineTo(Direction.Down);
            a(level - 1);
            drawLineTo(Direction.Left);
            c(level - 1);
        }
    }
    
    function b(level){
        if(level > 0){
            c(level - 1);
            drawLineTo(Direction.Left);
            b(level - 1);
            drawLineTo(Direction.Up);
            b(level - 1);
            drawLineTo(Direction.Right);
            d(level - 1);
        }
    }
    
    function c(level){
        if(level > 0){
            b(level - 1);
            drawLineTo(Direction.Up);
            c(level - 1);
            drawLineTo(Direction.Left);
            c(level - 1);
            drawLineTo(Direction.Down);
            a(level - 1);
        }
    }
    
    function d(level){
        if(level > 0){
            a(level - 1);
            drawLineTo(Direction.Down);
            d(level - 1);
            drawLineTo(Direction.Right);
            d(level - 1);
            drawLineTo(Direction.Up);
            b(level - 1);
        }
    }
    
    function drawLineTo(direction){
        var endPoint;

        switch (direction){
            case Direction.Up:
                 endPoint = new Point(curvePenPosition.X, curvePenPosition.Y - curveLineLength);
                 break;
            case Direction.Down:
                 endPoint = new Point(curvePenPosition.X, curvePenPosition.Y + curveLineLength);
                 break;
            case Direction.Left:
                 endPoint = new Point(curvePenPosition.X - curveLineLength, curvePenPosition.Y);
                 break;
            default: //right
                 endPoint = new Point(curvePenPosition.X + curveLineLength, curvePenPosition.Y);
                 break;
          }

          drawCurveLine(curvePenPosition, endPoint);
    }
    
    //assume that it is a square
    function drawGrid(space, length, point){
        if(point.X <= length){
            drawGridLine(new Point(point.X, 0), new Point(point.X, length));
            drawGridLine(new Point(0, point.Y), new Point(length, point.Y));
            drawGrid(space, length, new Point(point.X + space, point.Y + space));
        }
    }
    
    function drawGridLine(startPoint, endPoint){
        drawLine(startPoint, endPoint, gridLineColor, gridLineWidth);
    }
    
    function drawCurveLine(startPoint, endPoint){      
        drawLine(startPoint, endPoint, curveLineColor, curveLineWidth);
        
        //set current pen position
        curvePenPosition = endPoint;
    }
    
    function drawLine(startPoint, endPoint, color, width){
       ctx.beginPath();
       ctx.strokeStyle = color;
       ctx.lineWidth = width;
        
       ctx.moveTo(startPoint.X, startPoint.Y);
       ctx.lineTo(endPoint.X, endPoint.Y);
       ctx.stroke();
    }
}

window.drawHilbertCurve = function (){
    var h = new HilbertCurve("myCanvas");
    h.draw(+document.getElementById('levelBox').value);
}
