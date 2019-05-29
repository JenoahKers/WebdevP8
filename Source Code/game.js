function startGame() {
    myGameArea.start();
}

var hasStarted = 0;

var canAnimate = false;
var hotels = new Array();
var activities = new Array();
var categories = new Array();

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
        initActivities();
    }
}

function initHotels(){
    hotels[0] = new Image();
    hotels[0].src = "Art/Icons/Hotels/hotels_woord.png";
    hotels[1] = new Image();
    hotels[1].src = "Art/Icons/Hotels/FLORIS_logo.png";
    hotels[2] = new Image();
    hotels[2].src = "Art/Icons/Hotels/Dolphin.suites_logo.png";
    hotels[3] = new Image();
    hotels[3].src = "Art/Icons/Hotels/papagayotravel_logo.png";
    hotels[4] = new Image();
    hotels[4].src = "Art/Icons/Hotels/AVILA_logo.png";
    hotels[5] = new Image();
    hotels[5].src = "Art/Icons/Hotels/Amazonia_logo.png";

    categories.push(hotels);
}

function initActivities(){
    activities[0] = new Image();
    activities[0].src = "Art/Icons/Activities/activities_woord.png";
    activities[1] = new Image();
    activities[1].src = "Art/Icons/Activities/kitebording.png";
    activities[2] = new Image();
    activities[2].src = "Art/Icons/Activities/Museum.png";
    activities[3] = new Image();
    activities[3].src = "Art/Icons/Activities/North_sea_jazz.png";
    activities[4] = new Image();
    activities[4].src = "Art/Icons/Activities/Sami_sail.png";
    activities[5] = new Image();
    activities[5].src = "Art/Icons/Activities/west_diving.png";

    categories.push(activities);
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

function spawnRandomObject() {
    var randCategory = Math.floor(Math.random() * categories.length);
    var randomItem = Math.floor(Math.random() * (categories[randCategory].length - 1));
    var object = {
        image: categories[randCategory][0],
        output: categories[randCategory][randomItem + 1],
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

    for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        object.y += spawnRateOfDescent;
        myGameArea.context.drawImage(object.image, object.x, object.y, 60, 60);
        if(object.y > 215 && object.y < 275){
            if(object.x > player.x - 90 && object.x < player.x + 35){
                if(object.image = hotels[0]){
                    object.image = object.output;
                }
            }
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