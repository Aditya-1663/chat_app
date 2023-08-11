const fetch = require('fetch')

const submitform= async(e)=>{
    // async function submitform(e){
        // event.preventDefault() ;
        e.preventDefault();
        const email=document.forms['myform']['email'].value
        const password=document.forms['myform']['password'].value
        // alert("aditya")
    try{
      // const response = await fetch("http://localhost:3000/user/login", {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
              
      //       }, 
      //       body: JSON.stringify({email,password})
      //     });
          // const json=await response.json();
          // alert(JSON.stringify({email,password})) 
          // alert(response.json)
          const response=axios.post("http://localhost:3000/user/login",{email,password}) 
          alert(response)
          console.log(response);
    } catch(e){
      console.log(e);
    }

        //   if(json.success){
        //     // save the token and redirect
        //     localStorage.setItem('token',json.authtoken)
        //    navigate("/")
        //   }
        //   else{
        //     alert(json.success+", wrong password")
        //   }
    
    // return false
}