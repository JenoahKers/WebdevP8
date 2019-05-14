function startGame() {
    myGameArea.start();
}

var bookIcon = new Image();

window.onload = function(){
    
    bookIcon.src = "Yellow-page.png";
    bookIcon.width = 75;
    bookIcon.height = 37.5;
}

var clickedInCanvas = 0;

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.width = 200;
        this.canvas.height = 400;
        this.canvas.onmousemove = setPlayerPosition(event);
        this.canvas.onmousedown = function(){ PlayGame()};
        this.context = this.canvas.getContext("2d");
        var img = document.getElementById("book");
        img.width = 75;
        img.height = 37.5;
        this.context.drawImage(bookIcon, 0, 0);
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        draw();
    }
}

function PlayGame(){
    clickedInCanvas = 2;
}

var player = {
    x:myGameArea.canvas.width/3,
    y:myGameArea.canvas.height+75,
    speed: 20
};

function setPlayerPosition(e) {
    if(clickedInCanvas == 2){
        player.x = getMousePos(this.canvas, e).x;
    }
}

function clearCanvas() {
    myGameArea.context.clearRect(0,0, myGameArea.canvas.width, myGameArea.canvas.height);
}

window.addEventListener("mousemove", setPlayerPosition, false);

function draw(){
    var x = player.x;
    var y = player.y;

    myGameArea.context.beginPath();
    myGameArea.context.moveTo(x,y);
    myGameArea.context.lineTo(x+15, y+50);
    myGameArea.context.lineTo(x-15, y+50);
    myGameArea.context.fill();
    myGameArea.context.drawImage(bookIcon, 0, 0);
}

function getMousePos(canvas, evt) {
    var rect = myGameArea.canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function update(){
    console.log(clickedInCanvas);
    if(clickedInCanvas == 2){
        clearCanvas();
        draw();
    }
}
setInterval(update, 10);