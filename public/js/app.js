
const formdata = document.querySelector('form');
const textValue = document.querySelector('input');
const ele = document.querySelector('#displayText');

ele.textContent = '';

formdata.addEventListener('submit',(e)=>{
    e.preventDefault();

   if(textValue.value != ''){
    ele.textContent = 'fetching...'
       fetch('http://localhost:3000/getWeatherinfo?address='+textValue.value).then((res)=>{

       res.json().then((data)=>{
      
        if(data.error){
            ele.textContent = data.error
        }else{
         ele.textContent = data.msg;
        }
         
        })

       })
       
    
   }

})
