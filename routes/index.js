var express = require('express');
var router = express.Router();
var _ = require("lodash");
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

//////////////////////////////////////////////////////////////////////////

// este bloque sirve para probar con variables de usuarios locales

/*var users = [
  {
    id: 1,
    name: 'jonathanmh',
    password: '%2yx4'
  },
  {
    id: 2,
    name: 'test',
    password: 'test'
  }
];
*/

/////////////////////////////////////////////////////////////////////////

function initRouter(db){

var users = db.collection('login');

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'qwerty';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next){
  console.log('Recibido', jwt_payload);

  var user = users.findOne({"_id": jwt_payload.id}, function(err, user){
    if (user){
      next(null,user);
    }else{
      next(null,false);
    }
  });
});

passport.use(strategy);

var app = express();
app.use(passport.initialize());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  var filter = {};
  users.find(filter).toArray(function(err, docs){
    res.json(docs);
  });
});

router.post('/login', function(req, res, next){
  if(req.body.name && req.body.password){
    var name = req.body.name;
    var password = req.body.password;
  }

  //var user =
  users.findOne({"user": name}, function(err, user){
    console.log(user.name);

    if(!user){
      return res.status(401).json({message: "Error"});
    }

    if(user.password === req.body.password){
      var payload = {"_id": user.id};
      var token = jwt.sign(payload,jwtOptions.secretOrKey);
      return res.json({message:"OK", token: token});
    }else{
      return res.status(401).json({message:"No coinciden las contraseñas"});
    }
  });
});

router.get("/secret", passport.authenticate('jwt', {session:false}), function(req,res,next){
  res.json({message:"No se puede ver sin un token"});
});

router.get("/secretDebug", function(req,res,next){
  console.log(req.get('Autorizado'));
  next();
}, function(req,res){
  res.json("Debugging");
});

return router;
}

module.exports = initRouter;
