const  User  = require('../models/User');
const bcrypt = require('bcryptjs');



exports.register = async function (req, res) {

    try {
        let user = new User({
            ...req.body,
            passwordHash: bcrypt.hashSync(req.body.password, 8)
        });
        user = await user.save()
        if(!user){
            return res.status(500).json({
                type: 'Internal Server Error',
                message: 'Could not create new user'
            })
        }

        return res.status(201).json(user)
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({type: error.name, message: error.message})
        
    }
};
exports.login = async function (req, res){
    try {
        const { email, password } = req.body;
    const user = await User.findOne({email: email});
    if(!user){
        return res.status(404).json({
            message: 'User not found, check your email and try again'
        })
    }
    if(!bcrypt.compareSync(password, user.passwordHash)){
        return res.status(404).json({
            message: 'Incorrect Password'
        })
    }

    
    // const accessToken = jwt.sign(
    //     {id: user.id, isAdmin: user.isAdmin},
    //     process.env.ACCESS_TOKEN_SEC,
    //     {expiresIn: '24h'}
    // );

    // const refreshToken = jwt.sign(
    //     {id: user.id, isAdmin: user.isAdmin},
    //     process.env.REFRESH_TOKEN_SEC,
    //     {expiresIn: '60d'}
    // );

    // const token = await Token.findOne({
    //     userId: user.id   
    // })
    // if(token) await token.deleteOne();
    // await new Token({
    //     userId: user.id,
    //     refreshToken,
    //     accessToken
    // }).save();
    user.passwordHash = undefined;
    return res.json({...user._doc, })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({type: error.name, message: error.message})
    }
    
};
