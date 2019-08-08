window.onload = function(){
  
  let input;
  //read
  document.getElementById('file').addEventListener('change',readFile, false);
  function readFile (evt) {
    let files = evt.target.files;
    let file = files[0];
    let reader = new FileReader();
    reader.onload = function() {
      input = reader.result.split('\n');

    };
    reader.readAsText(file);
  }

  
  
  

  //write
  document.getElementById('save').addEventListener('click', saver, false);
  function saver(){
    let drawing;
    let w;
    let h;
    input = input.map(el=>el.split(' '));
    input.map((command)=>{
      //draw canvas
      if(command[0]==='C'){
        w = +command[1];  //to number type
        h = +command[2];
        
        drawing = new Array(w+2);
        for(let k = 0; k < drawing.length; k++){
          drawing[k]=new Array(h+2);
          for(let i = 0;i<h+2; i++){
            drawing[k][i]=' ';
          }
        }
        for(let k = 0; k <= w+1; k++){
          drawing[k][0]='-';
          drawing[k][h+1]='-';
        }
        for(let k = 1; k <= h; k++){
          drawing[0][k]='|';
          drawing[w+1][k]='|';
        }
      }
      
      //line
      if(command[0]==='L'){
        liner(+command[1],+command[2],+command[3],+command[4]);
      }
      
      //rectangle
      if(command[0]==='R'){
        let x1 = +command[1];
        let y1 = +command[2];
        let x3 = +command[3];
        let y3 = +command[4];
        let x2 = x1;
        let y2 = y3;
        let x4 = x3;
        let y4 = y1;
        liner(x1,y1,x2,y2);
        liner(x1,y1,x3,y3);
        liner(x2,y2,x4,y4);
        liner(x3,y3,x4,y4);
      }
      
      //bucket
      if(command[0]==='B'){
    

        let x = +command[1];
        let y = +command[2];
        let color = command[3];
        let initialColor = drawing[+command[1]][+command[2]];
        let pixelStack=[[x,y]];  //stack for vertical lines for coloring
        
        while(pixelStack.length){
          let newxy = pixelStack.pop();
          let reachLeft = false;
          let reachRight = false;
          x = newxy[0];
          y = newxy[1];
          let currentPixelColor = drawing[x][y];
          while(y>0 && currentPixelColor===initialColor ){
            currentPixelColor = drawing[x][y-1];
            y--;
          }
          //reset
          ++y;
          currentPixelColor = drawing[x][y];
          
          while (y++ <= h && currentPixelColor===initialColor){
            drawing[x][y-1]=color;
            //move left
            if(x>1){
              if(drawing[x-1][y-1]===initialColor){
                if(!reachLeft){
                  pixelStack.push([x-1,y-1]);
                  reachLeft = true;
                }
              }
              else if(reachLeft){
                reachLeft = false;
              }
            }
            
            //move right
            if(x < w){
              if(drawing[x+1][y-1]===initialColor){
                if(!reachRight){
                  pixelStack.push([x+1,y-1]);
                  reachRight = true;
                }
              }
              else if(reachRight){
                  reachRight = false;
              }
            }
            currentPixelColor = drawing[x][y];
            
          }
        }
        
      }
    });
  

    
  
    //line drawer
    function liner(x1,y1,x2,y2){
      //horizontal line
      if(x1===x2){
        let x = x1;
        for (let y = Math.min(y1,y2); y<=Math.max(y1,y2);y++){
          drawing[x][y]='x';
        }
      }
      //vertical line
      else{
        let y = y1;
        for (let x = Math.min(x1,x2); x<=Math.max(x1,x2);x++){
          drawing[x][y]='x';
        }
      }
    };
  
    //create canvas
    let canvas='';
    for (let y = 0;y <= h+1; y++){
      for(let x = 0;x <= w+1;x++){
          canvas+=drawing[x][y];
      }
      canvas+='\n';
    }

    
    
    let blob = new Blob([canvas], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "output.txt");
    
  }
};
