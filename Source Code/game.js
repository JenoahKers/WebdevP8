function startGame() {
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.width = 200;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        
    }
}

var player = {
    x:myGameArea.canvas.width/2,
    y:myGameArea.canvas.height-100,
    speed: 20
};

function move(e) {
    if(e.keyCode == 37){
        player.x -= player.speed;
    }
    if(e.keyCode == 39){
        player.x += player.speed;
    }
}

document.onkeydown = move;

function clearCanvas() {
    myGameArea.context.clearRect(0,0, myGameArea.canvas.width, myGameArea.canvas.height);
}

function drawPlayer(){
    var x = player.x;
    var y = player.y;
    myGameArea.context.beginPath();
    myGameArea.context.moveTo(x,y);
    myGameArea.context.lineTo(x+15, y+50);
    myGameArea.context.lineTo(x-15, y+50);
    myGameArea.context.fill();
}

function update(){
    clearCanvas();
    drawPlayer();
}
setInterval(update, 10);