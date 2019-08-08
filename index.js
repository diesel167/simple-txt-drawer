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
        //horizontal line
        if(command[1]===command[3]){
          let x = +command[1];
          let y1 = Math.min(+command[2],+command[4]);
          let y2 = Math.max(+command[2],+command[4]);
          for (let y = y1; y<=y2;y++){
            drawing[x][y]='x';
          }
        }
        //vertical line
        else{
          let y = +command[2];
          let x1 = Math.min(+command[1],+command[3]);
          let x2 = Math.max(+command[1],+command[3]);
          for (let x = x1; x<=x2;x++){
            drawing[x][y]='x';
          }
        }
      }
      
      //rectangle
      if(command[0]==='R'){
      
      
      }
      
      
    });
  
  
  
  
    //create canvas
    let canvas='';
    for (let y = 0;y <= h+1; y++){
      for(let x = 0;x <= w+1;x++){
        if(drawing[x][y]){
          canvas+=drawing[x][y];
        }
        else{
          canvas+=' ';
        }
      }
      canvas+='\n';
    }
    console.log(canvas);
    
    /*
    let blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "hello world.txt");
    */
  }
};
