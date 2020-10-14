const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('./authMiddleware/auth');

const {check,validationResult} = require('express-validator');
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.set('view engine','ejs');



app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/token',auth,function(req,res){
    console.log(req.check);
    res.json({'msg':'Token is valid','check':req.check});
});

app.post('/login',[
    check('loginusername',"Log In username required").not().isEmpty(),
    check('loginpassword','Password is required').not().isEmpty()
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({errors:errors.array()});
    }
    const {loginusername,loginpassword} = req.body;
    console.log(loginusername, loginpassword);
    try{
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(loginpassword,salt);
        console.log(newPassword);

        const payload = {
            user:{loginusername}
        };
        jwt.sign(payload,config.get('jwtSecret'),
            {expiresIn:370000},
            (err,token)=>{
                if(err) throw err;
                console.log(token);
                res.json({token});
            }
        );
        
    }catch(err){
        console.log(err);
    }
    
})

app.listen(3000,()=>{console.log('Port Connected')});
