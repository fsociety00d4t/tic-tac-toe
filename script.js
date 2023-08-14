const Gameboard = (function(){ 
   
    let GridArray = ['','','', '', '', '', '', '','']
    
     const getGrid = function () {
    let GridElement = document.querySelectorAll('.grid');
    GridElement.forEach((e,i)=> {
    GridArray[i]=(e);
})
} 
     const render = function (el, symbol) {
        GridArray[el].innerHTML=symbol;       
     } 
     
     const renderTurn = function (player,symbol) {
         let score = document.querySelector('.score');
         if (player==='')
             score.innerHTML=`It's ${symbol} turn`;
         else
         score.innerHTML=`It's ${player} turn`;
         
     }
     
     const renderWinner = function(symbol,player) {
         let score = document.querySelector('.score');
         if(symbol==='O')
             {
                 if (player==='')
                    score.innerHTML=`Player 1 has won`;
                 else
             score.innerHTML=`${player} has won`; ///HERE
             }
            
         else if 
             (symbol==='X') {
                 if (player==='')
                    score.innerHTML=`Player 2 has won`;
                 else
                  score.innerHTML=`${player} has won`;
             }
            
         else if 
             (symbol==='tie')
             score.innerHTML= `It's a Tie`;
     }
     
     const isAlreadyFilled = function (i) {
         return GridArray[i].innerHTML.trim()==='';
     }
     
     const disableGrid = function () {
         let GridElement = document.querySelectorAll('.grid');
         GridElement.forEach((e,i)=>{
           e.classList.add('disabled');
           })
         }
     

     return {
         GridArray: GridArray,
          getGrid : getGrid,
          render: render,
          renderTurn : renderTurn,
          isAlreadyFilled : isAlreadyFilled,
          disableGrid : disableGrid,
          renderWinner : renderWinner,
     }
       
     })();
    

Gameboard.getGrid();

const Player = (name, symbol) => {
    
       const showInfo = () =>{
            console.log (`name is ${name} and symbol is ${symbol}`);
    }
    
    return {showInfo,name,symbol};
};

const Game = (function() {
    let flag=0;
    let counter = 0;
    let gridcounter=0;
    let player1;
    let player2;
 
    const Btn = document.querySelector('.btn');
    Btn.addEventListener('click',function(){
        const P1 = document.getElementById('player1').value;
        const P2 = document.getElementById('player2').value;
         player1 = Player(P1,'O');
         player2 = Player(P2,'X');
        const module = document.querySelector('.hide');
        module.style.display='none';
        
    })
    
    let GridEl = document.querySelectorAll('.grid');
    GridEl.forEach((e,i)=> {
        e.addEventListener('click', function eventHandler() {
            console.log(`clicked element ${i}`);
                  if (Gameboard.isAlreadyFilled(i)){              
                    whosTurn(i,counter);
                    counter++; 
                    isGameOver();
                    gridcounter++;
            }
               
               if (gridcounter>8 && flag===0)
                    Gameboard.renderWinner('tie');  
                        
        })
    })
    
    
    const whosTurn = (i,counter) => {
        if (counter%2===0)
            {
                Gameboard.render(i,player1.symbol);
                Gameboard.renderTurn(player2.name,player2.symbol);
            }
        else    
            {
                 Gameboard.render(i,player2.symbol);
                 Gameboard.renderTurn(player1.name,player1.symbol);
            }
               
    }
    
    const isGameOver = () => {
        let column1 = [Gameboard.GridArray[0].innerHTML,Gameboard.GridArray[1].innerHTML,Gameboard.GridArray[2].innerHTML];
        
        let column2 = [Gameboard.GridArray[3].innerHTML,Gameboard.GridArray[4].innerHTML,Gameboard.GridArray[5].innerHTML];
        
        let column3 = [Gameboard.GridArray[6].innerHTML,Gameboard.GridArray[7].innerHTML,Gameboard.GridArray[8].innerHTML];
        
        let row1 = [Gameboard.GridArray[0].innerHTML,Gameboard.GridArray[3].innerHTML,Gameboard.GridArray[6].innerHTML];
        
        let row2 = [Gameboard.GridArray[1].innerHTML,Gameboard.GridArray[4].innerHTML,Gameboard.GridArray[7].innerHTML];
        
        let row3 = [Gameboard.GridArray[2].innerHTML,Gameboard.GridArray[5].innerHTML,Gameboard.GridArray[8].innerHTML];
        
        let zig1 = [Gameboard.GridArray[0].innerHTML,Gameboard.GridArray[4].innerHTML,Gameboard.GridArray[8].innerHTML];
        
        let zig2 = [Gameboard.GridArray[2].innerHTML,Gameboard.GridArray[4].innerHTML,Gameboard.GridArray[6].innerHTML];
        
        let c1= column1.every((e,i,arr)=> e === arr[0] && e[0]!='\n');
        if (c1) gameOver('c1');
        let c2= column2.every((e,i,arr)=> e === arr[0] && e[0]!='\n'); 
        if (c2) gameOver('c2');
        let c3= column3.every((e,i,arr)=> e === arr[0] && e[0]!='\n');
        if (c3) gameOver('c3');
        let r1= row1.every((e,i,arr)=> e === arr[0] && e[0]!='\n');
        if (r1) gameOver('r1');
        let r2= row2.every((e,i,arr)=> e === arr[0] && e[0]!='\n');
        if (r2) gameOver('r2');
        let r3= row3.every((e,i,arr)=> e === arr[0] && e[0]!='\n');
        if (r3) gameOver('r3');
        let z1= zig1.every((e,i,arr)=> e === arr[0] && e[0]!='\n');
        if (z1) gameOver('z1');
        let z2= zig2.every((e,i,arr)=> e === arr[0] && e[0]!='\n');
        if (z2) gameOver('z2');
        
    }
    
    
    const gameOver = (area) => {
        let player;
       // let name;
        switch(area) {
            case 'c1' :
                Gameboard.GridArray[0].style.backgroundColor='green';
                Gameboard.GridArray[1].style.backgroundColor='green';
                Gameboard.GridArray[2].style.backgroundColor='green';
                player=Gameboard.GridArray[0].innerHTML;
                break;
                
            case 'c2' :
                 Gameboard.GridArray[3].style.backgroundColor='green';
                Gameboard.GridArray[4].style.backgroundColor='green';
                Gameboard.GridArray[5].style.backgroundColor='green';
                player=Gameboard.GridArray[3].innerHTML;
                break;
                
            case 'c3' :
                 Gameboard.GridArray[6].style.backgroundColor='green';
                Gameboard.GridArray[7].style.backgroundColor='green';
                Gameboard.GridArray[8].style.backgroundColor='green';
                player=Gameboard.GridArray[6].innerHTML;
                break;
                
            case 'r1' :
                 Gameboard.GridArray[0].style.backgroundColor='green';
                Gameboard.GridArray[3].style.backgroundColor='green';
                Gameboard.GridArray[6].style.backgroundColor='green';
                player=Gameboard.GridArray[0].innerHTML;
                break;
                
            case 'r2' :
                 Gameboard.GridArray[1].style.backgroundColor='green';
                Gameboard.GridArray[4].style.backgroundColor='green';
                Gameboard.GridArray[7].style.backgroundColor='green';
                player=Gameboard.GridArray[1].innerHTML;
                break;
                
            case 'r3' :
                 Gameboard.GridArray[2].style.backgroundColor='green';
                Gameboard.GridArray[5].style.backgroundColor='green';
                Gameboard.GridArray[8].style.backgroundColor='green';
                player=Gameboard.GridArray[2].innerHTML;
                break;
                
            case 'z1' :
                 Gameboard.GridArray[0].style.backgroundColor='green';
                Gameboard.GridArray[4].style.backgroundColor='green';
                Gameboard.GridArray[8].style.backgroundColor='green';
                player=Gameboard.GridArray[0].innerHTML;
                break;
                
            case 'z2' :
                 Gameboard.GridArray[2].style.backgroundColor='green';
                Gameboard.GridArray[4].style.backgroundColor='green';
                Gameboard.GridArray[6].style.backgroundColor='green';
                player=Gameboard.GridArray[2].innerHTML;
                break;
        }
        
        flag++;
        Gameboard.disableGrid(); 
        if (player==='O')
        Gameboard.renderWinner(player,player1.name);
        else
            Gameboard.renderWinner(player,player2.name);
        
    }
    
        const restart = document.querySelector('.restart');
            restart.addEventListener('click',function(){
                location.reload();
                })
     
})();

