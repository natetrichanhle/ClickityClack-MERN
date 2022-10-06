const User = require('../models/User.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt.config");

class UserController {
    register(req, res){
        console.log(req.body)
        const user = new User(req.body);
        console.log(user);
        user.save()
            .then(()=>{
                res
                    .cookie("usertoken", jwt.sign({_id:user._id}, secret), {httpOnly: true})
                    .json({msg: "success", user: user})

            })
            .catch(err=> res.json(err))
    }


    login(req, res){
        User.findOne({email:req.body.email})
            .then(user => {
                if(user == null){
                    res.json({msg: "Invalid login attempt"}) //email is not found
                }else{
                    bcrypt.compare(req.body.password, user.password)
                        .then(passwordIsValid=>{
                            if(passwordIsValid){
                                res.cookie("usertoken", jwt.sign({_id: user._id}, secret), {httpOnly:true})
                                    .json({user: user});
                            }else{
                                res.json({msg: "Invalid login attempt"}) //incorrect password
                            }
                        })
                        .catch(err => res.status(400).json({msg: "Invalid login attempt2", error :err}))
                }
            })
    }

    getLoggedInUser(req,res){
        const decodedJWT = jwt.decode(req.cookies.usertoken, {complete:true});
        User.findById(decodedJWT.payload._id)
            .then(user=> res.json(user))
            .catch(err=> res.json(err))

    }

    logout(req, res)  {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }
}


module.exports = new UserController();