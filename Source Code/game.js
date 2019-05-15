function startGame() {
    myGameArea.start();
}

var hasStarted = 0;
var isInCanvas = 0;

var myGameArea = {
    canvas : document.createElement("canvas"),
    bookIcon: new Image(60, 30),
    start : function(){
        this.canvas.width = 200;
        this.canvas.height = 400;
        this.canvas.onmousemove = function(){ setPlayerPosition(event)};
        this.canvas.onmousedown = function(){ PlayGame()};
        this.context = this.canvas.getContext("2d");
        myGameArea.bookIcon.onload = function(){
            myGameArea.context.drawImage(myGameArea.bookIcon, player.x-myGameArea.bookIcon.width/2, player.y, 60, 30);
        }
        document.getElementById("advert").insertBefore(this.canvas, document.getElementById("advert").childNodes[0]);

        this.bookIcon.src = "Yellow-page.png";
        draw();

    }
}

function PlayGame(){
    hasStarted = 2;
}

var player = {
    x:myGameArea.canvas.width/3,
    y:myGameArea.canvas.height+75,
    speed: 20
};

function setPlayerPosition(e) {
    if(hasStarted == 2){
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

    myGameArea.context.drawImage(myGameArea.bookIcon, x-myGameArea.bookIcon.width/2, y, 60, 30);
}

function getMousePos(canvas, evt) {
    var rect = myGameArea.canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function update(){
    if(hasStarted == 2){
        clearCanvas();
        draw();
    }
}
setInterval(update, 10);