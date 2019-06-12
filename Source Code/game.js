function startGame() {
    myGameArea.start();
}

var hasStarted = 0;
var score = 0;
var endScore = 5;
var countdownTimer = 10;
var timePlaying = 0;
var startTime = 0;
//MOET NOG WEL DE TIMER TOEVOEGEN BOII
var hasGivenScore = false;
var canDrawScore = true;

var canAnimate = false;
var hotels = new Array();
var activities = new Array();
var restaurants = new Array();
var shopping = new Array();
var stores = new Array();
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

        this.bookIcon.src = "Art/Yellow-page.png";
        draw();
        initHotels();
        initActivities();
        initRestaurants();
        initShopping();
        initStores();

        var startScreen = new Image(180, 380);
        startScreen.src = "Art/StartScreen.png";

        startScreen.onload = function(){
            myGameArea.context.drawImage(startScreen, 10, 10, 180, 380);
        }
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

function initRestaurants(){
    restaurants[0] = new Image();
    restaurants[0].src = "Art/Icons/Restaurants/Restaurants_woord.png";
    restaurants[1] = new Image();
    restaurants[1].src = "Art/Icons/Restaurants/Burgerking_logo.png";
    restaurants[2] = new Image();
    restaurants[2].src = "Art/Icons/Restaurants/Nemo_logo.png";
    restaurants[3] = new Image();
    restaurants[3].src = "Art/Icons/Restaurants/Restaurant_week_logo.png";
    restaurants[4] = new Image();
    restaurants[4].src = "Art/Icons/Restaurants/Subway_logo.png";
    restaurants[5] = new Image();
    restaurants[5].src = "Art/Icons/Restaurants/Tinto_logo.png";

    categories.push(restaurants);
}

function initShopping(){
    shopping[0] = new Image();
    shopping[0].src = "Art/Icons/Shopping/Shopping_woord.png";
    shopping[1] = new Image();
    shopping[1].src = "Art/Icons/Shopping/AlbertHeijn_logo.png";
    shopping[2] = new Image();
    shopping[2].src = "Art/Icons/Shopping/Ankateam_logo.png";
    shopping[3] = new Image();
    shopping[3].src = "Art/Icons/Shopping/Centrum_logo.png";
    shopping[4] = new Image();
    shopping[4].src = "Art/Icons/Shopping/Spar_logo.png";
    shopping[5] = new Image();
    shopping[5].src = "Art/Icons/Shopping/Vreugdenhil_logo.png";

    categories.push(shopping);
}

function initStores(){
    stores[0] = new Image();
    stores[0].src = "Art/Icons/Stores/Store_woord.png";
    stores[1] = new Image();
    stores[1].src = "Art/Icons/Stores/Dulce_logo.png";
    stores[2] = new Image();
    stores[2].src = "Art/Icons/Stores/Flair_logo.png";
    stores[3] = new Image();
    stores[3].src = "Art/Icons/Stores/Gift_logo.png";
    stores[4] = new Image();
    stores[4].src = "Art/Icons/Stores/Prosport_logo.png";
    stores[5] = new Image();
    stores[5].src = "Art/Icons/Stores/Sambil_logo.png";

    categories.push(stores);
}

function PlayGame(){
    if(canAnimate == false){
        hasStarted = 2;
        canAnimate = true;
        animate();
        startTime = timePlaying;
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
        x: Math.random() * (myGameArea.canvas.width - 60),
        y: spawnLineY,
    }
    objects.push(object);
    hasGivenScore = false;
}

function animate() {
    var time = Date.now();
    if (time > (lastSpawn + spawnRate) && canAnimate) {
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
                if(hasGivenScore == false){
                    hasGivenScore = true;
                    score += 1;
                    if(score >= endScore){
                        canAnimate = false;
                        canDrawScore = false; myGameArea.canvas.onmousedown = function(){ window.location = "https://www.yellowpages-curacao.com/"};
                        endGame();
                        objects = [];
                    }
                }
                if(object.image = hotels[0]){
                    object.image = object.output;
                }
            }
        }
        else if(object.y > 400){
            objects.shift();
        }
    }
    drawScore();
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

function drawScore(){
    if(canDrawScore){
        var bottomBar = new Image(50, 200);
        bottomBar.src = "Art/Bottom_bar.png";

        myGameArea.context.drawImage(bottomBar, 0, myGameArea.canvas.height - 50, 200, 50);

        myGameArea.context.fillStyle = "#ffffff";
        myGameArea.context.font = "24px Arial";
        myGameArea.context.fillText("Score: " + score, 10, myGameArea.canvas.height - 17);
    }
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
        if(!canAnimate){
            endGame();
        }
    }
}

function endGame(){
    var winScreen = new Image(180, 380);
    winScreen.src = "Art/WinScreen.png";

    myGameArea.context.drawImage(winScreen, 10, 10, 180, 380);
}
function setPlayTime(){
    timePlaying++;
    if(hasStarted == 2){
        if((startTime + countdownTimer) == timePlaying){
            canAnimate = false;
            canDrawScore = false; myGameArea.canvas.onmousedown = function(){ window.location = "https://www.yellowpages-curacao.com/"};
            endGame();
            objects = [];
        } 
    }
    console.log("Current is: " + timePlaying + ", startTime is: " + startTime + " and countDownTime is: " + countdownTimer);
}
setInterval(animate.checkColl)
setInterval(update, 10);
setInterval(setPlayTime, 1000);