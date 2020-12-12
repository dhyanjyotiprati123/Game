const Score=document.querySelector(".score");
const Start=document.querySelector(".start");
const Area=document.querySelector(".gameArea");


const keys={
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

let player={ speed: 5, score: 0};

const KeyDown=(e)=>{
    e.preventDefault();
    keys[e.key]=true;
    console.log(keys);
}

const KeyUp=(e)=>{
    e.preventDefault();
    keys[e.key]=false;
    console.log(keys);
}

const Collide= (a , b)=>{
    myCar=a.getBoundingClientRect();
    eCar=b.getBoundingClientRect();

    return !((myCar.bottom<eCar.top) || (myCar.top> eCar.bottom) || (myCar.right<eCar.left) || (myCar.left>eCar.right))
}

const moveLines=()=>{
    let Lines=document.querySelectorAll(".lines");

    Lines.forEach((val)=>{
       
        val.y += player.speed;
        val.style.top=val.y + "px";
        if(val.y >= 900){
            val.y = -750
        }
    })
}

const EndGame =()=>{
    player.start= false;
    Start.classList.remove('hide');
    Start.innerHTML=`Game Over 
    Your Score is ${player.score}
    Click Here To Start Again`
}

const moveEnemy=(car)=>{
    let Enemy=document.querySelectorAll(".enemy");

    Enemy.forEach((val)=>{

        if(Collide(car, val)){
           EndGame();
        }
       
        val.y +=player.speed;
        val.style.top=val.y + "px";

        if(val.y >= 900){
            val.y = -300
            val.style.left=Math.floor(Math.random()*400) + "px";
        }
    })
}

const playGame= ()=>{

    let car=document.querySelector(".car");
    const Road=Area.getBoundingClientRect();

    if(player.start){

        moveLines();
        moveEnemy(car);

        if(keys.ArrowUp && player.y > 100){player.y -= player.speed}
        if(keys.ArrowDown && player.y < 622){player.y += player.speed}
        if(keys.ArrowLeft && player.x > 0){player.x -= player.speed}
        if(keys.ArrowRight && player.x < 390){player.x += player.speed}

        car.style.top=player.y + "px";
        car.style.left=player.x + "px";

     window.requestAnimationFrame(playGame);
     player.score++;
     Score.innerHTML=`SCORE: ${player.score}`;
    
}
}

const startGame=()=>{
    Start.classList.add("hide");
    Area.innerHTML="";

   player.start=true;
   player.score=0;
    window.requestAnimationFrame(playGame);
  
    

    for(i=0; i<5; i++ ){
        let lines=document.createElement("div");
        lines.setAttribute("class", "lines");
        lines.y=(i*80);
        lines.style.top=lines.y + "px";
        lines.style.marginTop = (i*55) + "px";
        Area.appendChild(lines);
       
    }

    for(i=0; i<3; i++ ){
        let enemy=document.createElement("div");
        enemy.setAttribute("class", "enemy");
        enemy.y=((i+1)*390)-1;
        enemy.style.left=Math.floor(Math.random()*390) + "px";
        enemy.style.top=enemy.y + "px";
        enemy.style.marginTop = (i*55) + "px";
        Area.appendChild(enemy);
       
    }

    let car = document.createElement("div");
    car.setAttribute("class","car");
    Area.appendChild(car);

    player.x=car.offsetLeft;
    player.y=car.offsetTop;
  
}

document.addEventListener("keydown", KeyDown);
document.addEventListener("keyup", KeyUp);

Start.addEventListener("click", startGame);
