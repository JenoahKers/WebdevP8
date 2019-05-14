function startGame() {
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.width = 200;
        this.canvas.height = 400;
        this.canvas.onmousemove = setPlayerPosition(event);
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        
    }
}

var player = {
    x:myGameArea.canvas.width/3,
    y:myGameArea.canvas.height+75,
    speed: 20
};

function setPlayerPosition(e) {
    player.x = getMousePos(this.canvas, e).x;
}

function clearCanvas() {
    myGameArea.context.clearRect(0,0, myGameArea.canvas.width, myGameArea.canvas.height);
}

window.addEventListener("mousemove", setPlayerPosition, false);

function drawPlayer(){
    var x = player.x;
    var y = player.y;
    myGameArea.context.beginPath();
    myGameArea.context.moveTo(x,y);
    myGameArea.context.lineTo(x+15, y+50);
    myGameArea.context.lineTo(x-15, y+50);
    myGameArea.context.fill();
}

function getMousePos(canvas, evt) {
    var rect = myGameArea.canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function update(){
    clearCanvas();
    drawPlayer();
}
setInterval(update, 10);