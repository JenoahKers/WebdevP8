function startGame() {
    myGameArea.start();
}

var hasStarted = 0;

var canAnimate = false;
var hotels = new Array();

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
        initHotels();
    }
}

function initHotels(){
    hotels[0] = new Image();
    hotels[0].src = "Art/Icons/Hotels/FLORIS_logo.png";
    hotels[1] = new Image();
    hotels[1].src = "Art/Icons/Hotels/Dolphin.suites_logo.png";
}

function PlayGame(){
    if(canAnimate == false){
        hasStarted = 2;
        animate(); 
        canAnimate = true;
    }
}

var player = {
    x:myGameArea.canvas.width/3,
    y:myGameArea.canvas.height+75,
    speed: 20
};

var spawnLineY = -5;
var spawnRate = 1000;
var spawnRateOfDescent = 4.50;
var lastSpawn = -1;
var objects = [];
var startTime = Date.now();
var categories = [];

function spawnRandomObject() {
    var t;
//    if (Math.random() < 0.50) {
//        t = hotels[0];
//    } else {
//        t = "blue";
//    }
    var randomHotel = Math.floor(Math.random() * hotels.length);
    console.log(randomHotel);
    
    var pattern = myGameArea.context.createPattern(hotels[0], "repeat");
    t = pattern;
    var object = {
        type: t,
        x: Math.random() * (myGameArea.canvas.width - 30) + 15,
        y: spawnLineY,
    }
    objects.push(object);
}

function animate() {
    var time = Date.now();
    if (time > (lastSpawn + spawnRate)) {
        lastSpawn = time;
        spawnRandomObject();
    }
    requestAnimationFrame(animate);
    myGameArea.context.beginPath();

    for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        object.y += spawnRateOfDescent;
        myGameArea.context.beginPath();
        //myGameArea.context.arc(object.x, object.y, 8, 0, Math.PI * 2);
        myGameArea.context.rect(object.x, object.y, 50, 20);
        myGameArea.context.closePath();
        myGameArea.context.fillStyle = object.type;
        myGameArea.context.fill();
        if(object.y > 215 && object.y < 275){
            if(object.x > player.x - 35 && object.x < player.x + 35){
                //console.log("x is same as player");
                objects.shift();
            }
            //console.log("y is same as player");
        }
        else if(object.y > 400){
            objects.shift();
        }
    }

}
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
setInterval(animate.checkColl)
setInterval(update, 10);