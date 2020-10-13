document.addEventListener('DOMContentLoaded',()=>{
    const selection = document.querySelector('body select');
    const loginForm = document.forms[1];
    const registerForm = document.forms[0];
    selection.addEventListener('change',e =>{
        const selectValue = e.target.value;
        if(selectValue === 'register'){
            registerForm.style.display = 'inline-block';
            loginForm.style.display = 'none';
        }else if(selectValue === 'login'){
            registerForm.style.display = 'none';
            loginForm.style.display = 'inline-block';
        }else{
            registerForm.style.display = 'none';
            loginForm.style.display = 'none';
        }
    });

    registerForm.addEventListener('submit',e =>{
        e.preventDefault();
        const body  = {
            username: e.target.username.value,
            password: e.target.password.value
        };
        
    })

    loginForm.addEventListener('submit',e =>{
        e.preventDefault();
        const loginData  = {
            loginusername: e.target.loginusername.value,
            loginpassword: e.target.loginpassword.value
        };
        const headers = {
            'Content-Type':'application/json'
        };

        const sendLoginInfo = async () =>{
            try{
                const response = await fetch('http://localhost:3000/login',{
                    method:'POST',
                    headers,
                    body:JSON.stringify(loginData)
                });
                const data = await response.json();
                return data;
            }catch(err){
                console.log(err.message);
            }  
        };
        sendLoginInfo()
            .then(data => {
                if(data.hasOwnProperty('errors')){
                    data.errors.map(err =>{
                        console.log(err.msg);
                    })
                    // console.log(data.errors[0].msg);
                }else{
                    console.log('Login Sucess');
                }
                
            });
        
    });


})