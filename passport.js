const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
   usernameField: 'wilmer',
   passwordField: '123456' 
    },
    function(user,password, cb){
     return login.findOne({user,password})
     .then(user =>{
        if(!user){
            return cb(null,false,{message:'Usuario o Contraseña incorrecta.'});
        }
        return cb(null,user,{message:'Inicio de sesión correcto'});
     })   
     .catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'S3cr3tK3y'
},
    function (jwtPayload, cb) {
        return login.findOneById(jwtPayload.id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
    }
));