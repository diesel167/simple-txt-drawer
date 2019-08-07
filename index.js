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
      console.log(input);
    };
    reader.readAsText(file);
  }

  
  
  

  //write
  document.getElementById('save').addEventListener('click', saver, false);
  function saver(){
    let drawing='';
    input.map((command)=>{
      if(command[0]==='C'){
      
      }
    });
    
    
    console.log(input);
    /*
    let blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "hello world.txt");
    */
  }
};
