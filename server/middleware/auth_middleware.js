const jwt = require("jsonwebtoken")
const { read_file, write_file } = require("../fs/fs_api")


module.exports = async function(req, res, next){
  if(req.headers.token){
    let userInfo = await jwt.verify(req.headers.token, process.env.SECRET_KEY)
    let userInfoArr =  read_file('jwt.json')

    userInfoArr[0] = userInfo
 
 
    write_file("jwt.json", userInfoArr)
    next()
  } else{
    return res.send({
        msg: 'Token mavjud emas!'
    })
  }
    
    
}