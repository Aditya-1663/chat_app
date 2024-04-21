const fri=document.getElementById("myfri")
fri.addEventListener('click',function(){
   
 
      document.querySelector('.myfrilist').style.display='none';
      document.querySelector('.newfrilist').style.display='block';

})
const newfri=document.getElementById("newfri")
newfri.addEventListener('click',function(){
  
      document.querySelector('.myfrilist').style.display='block';
      document.querySelector('.newfrilist').style.display='none';

})