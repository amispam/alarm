const di1 = document.querySelector("#di1");
           const di2 = document.querySelector("#di2");
           const min = document.querySelector("#min");
           const sec = document.querySelector("#sec");
           const btn = document.querySelector("button");
           const stop = document.querySelector("#stop");
           stop.style.display = "none";
           const mtr = document.querySelector("#mtr");
           mtr.style.display = "none";
           btn.addEventListener("click",()=>{
               if((min.value != null && sec.value != null) && (min.value == parseInt(min.value) && sec.value == parseInt(sec.value)) && (sec.value > 0 || min.value > 0)){
                   di1.style.display = "none";
                   min.innerHTML = "";
                   sec.innerHTML = "";
                   di2.style.display = "block";
                   var z = -100;
                   var total = (parseInt(sec.value)+parseInt(min.value*60));
                   const rslt = total;
                   var ttl = rslt;
                   
      
            mtr.style.display = " block";
            function meter(){
            if(ttl>=0){  
            ttl = ((rslt-(z/100))/rslt)*100;
            mtr.value = ttl;
            z++;
            if(mtr.value == 0){
                clearInterval(mtr1);
            }
                }
            }
                     var mtr1 = setInterval(meter,10);
      
           
                   
                   var timer = setInterval(()=>{
              if(total >= 0) {
                    di2.innerHTML = "<h1>"+status(parseInt(total))+"</h1>";
                    
              if(total === 0){
            stop.style.display = "block";
            mtr.style.display = "none";
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            var audio = new AudioContext();
            var osc = audio.createOscillator();
            osc.connect(audio.destination);
            var i = 0;
            var beep = setInterval(()=>{
            i++;
            if(i%2==0){
            osc.type = "square";
            }
            if(i%2 == 1){
                osc.type = "triangle";
            }
            },300)
            osc.start();
            clearInterval(timer);
            stop.addEventListener("click", ()=>{
                stop.style.display = "none";
                clearInterval("beep");
                osc.stop();
                di2.style.display = "none";
                di2.innerHTML = "";
                di1.style.display = "block";
            });
                  }
                  }
                  total--;
                   },1000);
        
                   
               }
               else{
                   console.log("Error...");
               }
           });
           
           function status(num){
               var minNum = parseInt(num/60);
               var secNum = parseInt(num)-(minNum*60);
               if(minNum < 10){
                   minNum = "0"+minNum;
               }
               if(secNum < 10){
                   secNum = "0"+secNum;
               }
               return minNum+":"+secNum;
           }
