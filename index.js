let game = function () {
  let time = 30;
  let movement = 15;
  let movementBar = 20;
  let score1;
  let score2;
  let width = document.documentElement.clientWidth - movement;
  let height = document.documentElement.clientHeight - movement;
  let controlGame;
  let player1;
  let player2;

  function start() {
    init();
    console.log('start');
    controlGame = setInterval(play, time);
  }

  function init() {
    ball.style.left = 0;
    ball.state = 1;
    ball.direction = 1;
    player1 = new Object();
    player2 = new Object();
    player1.keyPress = false;
    player1.keyCode = null;
    player2.keyPress = false;
    player2.keyCode = null;
  }

  function restart() {
    init();
    start();
  }

  function stop(flag) {
    if (flag === 'gano 1') {
      clearInterval(controlGame);
      alert('Gano el jugador 1');
      restart();
    } else {
      clearInterval(controlGame);
      alert('Gano el jugador 2');
      restart();
    }
  }

  function play() {
    moveBall();
    moveBallVertical();
    checkIfLost();
  }

  function checkIfLost() {
    if (ball.offsetLeft >= width) {
      score1 = document.getElementById('score');
      score1.innerHTML = parseInt(score1.innerHTML) + 1;
      flag = 'gano 1';
      stop(flag);
      return
    }
    if (ball.offsetLeft <= 0) {
      score2 = document.getElementById('score2');
      score2.innerHTML = parseInt(score2.innerHTML) + 1;
      flag = 'gano 2';
      stop(flag);
      return
    }
  }

  function moveBallVertical() {
    checkStateBall();
    switch(ball.state){
        case 1: // derecha, abajo
            ball.style.left = (ball.offsetLeft + movement) +"px";
            ball.style.top = (ball.offsetTop + movement) +"px";
            break;
        case 2: // derecha, arriba
            ball.style.left = (ball.offsetLeft + movement) +"px";
            ball.style.top = (ball.offsetTop - movement) +"px";
            break;
        case 3: // izquierda, abajo
            ball.style.left = (ball.offsetLeft - movement) +"px";
            ball.style.top = (ball.offsetTop + movement) +"px";
            break;
        case 4: // izquierda, arriba
            ball.style.left = (ball.offsetLeft - movement) +"px";
            ball.style.top = (ball.offsetTop - movement) +"px";
            break;
    }
  }

  function checkStateBall() {
    if(collidePlayer2()){
        ball.direction = 2;
        if(ball.state == 1) ball.state = 3;
        if(ball.state == 2) ball.state = 4;
    }else if(collidePlayer1()){
        ball.direction = 1;
        if(ball.state == 3) ball.state = 1;
        if(ball.state == 4) ball.state = 2;
    }

    if(ball.direction ===1){
        if(ball.offsetTop >= height) ball.state=2;
        else if(ball.offsetTop <=0 ) ball.state=1;
    }else{
        if(ball.offsetTop >= height) ball.state=4;
        else if(ball.offsetTop <=0 ) ball.state=3;
    }
  }

  function collidePlayer1() {
    if(ball.offsetLeft <= (bar1.clientWidth) &&
      ball.offsetTop >= bar1.offsetTop &&
      ball.offsetTop <= (bar1.offsetTop + bar1.clientHeight)){
        return true;
    }
    return false;
  }

  function collidePlayer2() {
    if(ball.offsetLeft >= (width-bar2.clientWidth) &&
      ball.offsetTop >= bar2.offsetTop &&
      ball.offsetTop <= (bar2.offsetTop + bar2.clientHeight)){
        return true;
    }
    return false;
  }

  function moveBall() {
    if (player1.keyPress) {
      if (player1.keyCode === 81 && bar1.offsetTop >= 0) {
        bar1.style.top = (bar1.offsetTop - movementBar) + 'px';
      }
      if (player1.keyCode === 65 && (bar1.offsetTop + bar1.clientHeight) <= height) {
        bar1.style.top = (bar1.offsetTop + movementBar) + 'px';
      }
    }
    if (player2.keyPress) {
      if (player2.keyCode === 79 && bar2.offsetTop >= 0) {
        bar2.style.top = (bar2.offsetTop - movementBar) + 'px';
      }
      if (player2.keyCode === 76 && (bar2.offsetTop + bar2.clientHeight) <= height) {
        bar2.style.top = (bar2.offsetTop + movementBar) + 'px';
      }
    }
  }

  document.onkeydown = function (e) {
    e = e || window.event;
    switch (e.keyCode) {
      case 81: //Q
      case 65: //A
        player1.keyCode = e.keyCode;
        player1.keyPress = true;
        break;
      case 79: //O
      case 76: //L
        player2.keyCode = e.keyCode;
        player2.keyPress = true;
        break;
    }
  }

  document.onkeyup = function (e) {
    e = e || window.event;
    if (e.keyCode === 81 || e.keyCode === 65) {
      player1.keyPress = false;
    }
    if (e.keyCode === 79 || e.keyCode === 76) {
      player2.keyPress = false;
    }
  }

    start();
  }();