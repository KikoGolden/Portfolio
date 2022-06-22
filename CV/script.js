//loading
$(window).on("load", function () {
  $("#loader").fadeOut(1000);
  $("#main-content").fadeIn(1000);
});

//elements
let grass = document.getElementById('grass-field');
let player = document.getElementById('player');
let controls = document.getElementById('controls');
let book = document.getElementById('book');
let stopSign = document.getElementById('stopSign');
let directionSign = document.getElementById('directionSign');
let dreamBubble = document.getElementById('dream-bubble');
let projects = document.getElementById('projects');
let contactBtn = document.getElementById('contactBtn')
let nextBtn = document.querySelectorAll('.next').forEach(x=>x.addEventListener('click', nextBtnClicked));

let firstPage = document.getElementById('first-part');
let secondPage = document.getElementById('second-part');
let thirdPage = document.getElementById('third-part');
let fourthPage = document.getElementById('fourth-part');
let fifthPage = document.getElementById('fifth-part');
let sixthPage = document.getElementById('sixth-part');

let dreamBubbleClosed = false;
let jumped = false;
let isWalking = false;
let projectSpawned = false;
let controlsPopped = false;
let isBookSpawned = false;
let isBubbleSpawned = false;

let lastKeyPressed = 'r';
let nextClickCount = 0;

let defaultProjectLeft = 50;
let defaultDirectionSignLeft = 80;
let defaultStopLeft = 2;
let defaultControlsLeft = 50;
let defaultBookLeft = 50;
let defaultWidth = 100;
let defaultMargin = 0;

//controls pop up
setTimeout(function(){
  controls.classList.add('popUp');
  controlsPopped = true;
},2000)

//W, A, D Walking
addEventListener('keydown',(e) => {
    if(e.keyCode == 68){//D Key
      walkRight();
    }
   
    if(e.keyCode == 65){//A Key
      walkLeft();
     }

     if(e.keyCode == 87){//W Key
        jump();
    }

});

//key up
addEventListener('keyup',(e) => {
  if (e.keyCode == 68) {
    player.style.backgroundImage = "url('./images/player.png')";
  }else if (e.keyCode == 65){
    player.style.backgroundImage = "url('./images/playerLeft.png')";
  }
});

//walk animation func
function walk(direction){
  if (direction == 'right') {
    player.style.backgroundImage = "url('./images/walkR.gif')";
    }
    else if(direction == 'left'){
      player.style.backgroundImage = "url('./images/walkL.gif')";
    }
 
}

/*next button click func*/
function nextBtnClicked(){
 nextClickCount++;
 switch (nextClickCount){
  case 1: 
      firstPage.style.display = 'none';
      secondPage.style.display = 'inline-block';
  break;
  case 2: 
  secondPage.style.display = 'none';
      thirdPage.style.display = 'inline-block';
  break;
  case 3: 
  thirdPage.style.display = 'none';
      fourthPage.style.display = 'inline-block';
  break;
  case 4: 
  fourthPage.style.display = 'none';
      fifthPage.style.display = 'inline-block';
  break;
  case 5: 
  fifthPage.style.display = 'none';
      sixthPage.style.display = 'inline-block';
  break;
  case 6: 
  dreamBubble.classList.remove('popUp');
  dreamBubbleClosed = true;
  break;


 }
}

//walk right
function walkRight(){
    lastKeyPressed = 'r'

    if (!isWalking && !jumped) {
      isWalking = true;
      player.style.backgroundImage = "url('./images/player.png')";
      walk('right');
      setTimeout(function(){
        isWalking = false;
      },800);
    }

    if (controlsPopped) {
      defaultControlsLeft -= 0.5;
      controls.style.left = defaultControlsLeft + 'vw';
    }

    if (controls.style.left == '-13vw' && !isBookSpawned) {
      isBookSpawned = true;
      book.classList.add('popUp');
    }
    if (isBookSpawned) {
      defaultBookLeft -= 0.5;
      book.style.left = defaultBookLeft + 'vw';
    }

    if (book.style.left == '15vw' && !isBubbleSpawned) {
      isBubbleSpawned = true;
      dreamBubble.classList.add('popUp');
    }

    if (book.style.left <= '15vw' && dreamBubbleClosed) {
      projects.classList.add('fadeIn');
      projectSpawned = true;
    }

    if (projectSpawned) {
      defaultProjectLeft -= 0.5;
      projects.style.left = defaultProjectLeft + 'vw';
      
    }
          
    defaultDirectionSignLeft -= 0.5;
    directionSign.style.left = defaultDirectionSignLeft + 'vw';

      defaultStopLeft -= 0.5;
      stopSign.style.left = defaultStopLeft + 'vw';
      
      defaultWidth += 0.5;
      defaultMargin -= 0.5;
        grass.style.width = defaultWidth + 'vw';
        grass.style.marginLeft = defaultMargin + 'vw';
}

//walk left
function walkLeft(){
  lastKeyPressed = 'l'

  if (!isWalking && !jumped) {
    isWalking = true;
    player.style.backgroundImage = "url('./images/playerLeft.png')";
    walk('left');
    setTimeout(function(){
      isWalking = false;
    },800);
  }

  if (defaultWidth != 100) {
    if (controlsPopped) {
      defaultControlsLeft += 0.5;
      controls.style.left = defaultControlsLeft + 'vw';
    }
    if (isBookSpawned) {
      defaultBookLeft += 0.5;
      book.style.left = defaultBookLeft + 'vw';
    }

    if (projectSpawned) {
      defaultProjectLeft += 0.5;
      projects.style.left = defaultProjectLeft + 'vw';
    }

    defaultDirectionSignLeft += 0.5;
    directionSign.style.left = defaultDirectionSignLeft + 'vw';

    defaultStopLeft += 0.5;
    stopSign.style.left = defaultStopLeft + 'vw';

    defaultWidth-= 0.5;
    defaultMargin+= 0.5;
      grass.style.width = defaultWidth + 'vw';
      grass.style.marginLeft = defaultMargin + 'vw';
  }
}

//jump
function jump(){
  if (!player.classList.contains('jumpR') && !player.classList.contains('jumpL') && lastKeyPressed == 'r') {
    player.classList.add('jumpR');
    jumped = true;
    player.style.backgroundImage = "url('images/jumpR.gif')";
    setTimeout(function(){
        player.classList.remove('jumpR');
        jumped = false;
        player.style.backgroundImage = "url('images/player.png')";
    },500);
   }else if (!player.classList.contains('jumpR') && !player.classList.contains('jumpL') && lastKeyPressed == 'l') {
     player.classList.add('jumpL');
     jumped = true;
     player.style.backgroundImage = "url('images/jumpL.gif')";
     setTimeout(function(){
         player.classList.remove('jumpL');
         jumped = false;
         player.style.backgroundImage = "url('images/playerLeft.png')";
     },500);
    }
}

//contact button click function
contactBtn.addEventListener('click',()=>{
  let root = document.getElementById('root');
  let contact = document.getElementById('contact-form');
  contact.classList.add('fadeIn');
  root.classList.add('fadeOut');
  setTimeout(function(){
       root.style.display = 'none';
  },2500)
})