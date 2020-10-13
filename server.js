const express = require('express');
const app = express();
const cors = require('cors');
const {check,validationResult} = require('express-validator');
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.set('view engine','ejs');



app.get('/',(req,res)=>{
    res.render('index');
});

app.post('/login',[
    check('loginusername',"Log In username required").not().isEmpty(),
    check('loginpassword','Password is required').not().isEmpty()
],(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({errors:errors.array()});
    }
    res.json({'message':'Grettings from /login REST API'});
})

app.listen(3000,()=>{console.log('Port Connected')});
