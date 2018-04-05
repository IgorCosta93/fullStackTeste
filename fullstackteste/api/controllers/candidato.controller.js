var mongoose    = require('mongoose');
var Candidato   = mongoose.model('Candidato');
var bcrypt      = require('bcrypt-nodejs');
var jwt         = require('jsonwebtoken');

module.exports.addCandidato = function(req, res) {
  Candidato.create({
    nome                  : req.body.nome,
    cpf                   : req.body.cpf,
    telefone              : req.body.telefone,
    endereco              : req.body.endereco,
    sexo                  : req.body.sexo,
    idade                 : req.body.idade,
    termoResponsabilidade : req.body.termoResponsabilidade || false,
    usuario               : req.body.usuario,
    senha                 : bcrypt.hashSync(req.body.senha, bcrypt.genSaltSync(10))
  }, function(err, candidato) {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      res.status(201).json(candidato);
    }
  });
  Candidato.close;
};

module.exports.getCandidatos = function(req,res){
    Candidato
      .find()
      .exec(function(err, candidato){
          if(err){
            console.log("Erro ao procurar por Candidatos");
            res
              .status(500)
              .json(err);
          }else {
            res
              .json(candidato);
          }
      });
};

module.exports.getCPF = function(req,res){
    Candidato
      .findOne({
        cpf: req.params.cpf
      }).exec(function(err, candidato){
          if(err){
            console.log("Erro ao procurar por CPF");
            res
              .status(500)
              .json(err);
          }else {
            res
              .json(candidato);
          }
      });
};

module.exports.getCandidato = function(req, res) {
  console.log('Candidato encontrado ' + req.params.id);

  Candidato
    .findById(req.params.id)
    .exec(function(err, candidato){
    var response = {
      status  : 200,
      message : candidato
    };
    if (err){
      console.log("Erro ao encontrar o Candidato");
      response.status   = 500;
      response.message  = err;
    }else if (!candidato) {
      console.log("Candidato nao encontrado no Banco de Dados");
      response.status = 404;
      response.message = {
        "message" : "Candidato nao encontrado" + candidato
      };
    }
    res
      .status(response.status)
      .json(response.message);
  });
};

module.exports.atualizarCandidato = function(req,res){
    Candidato.findById(req.body._id, (err, candidato) => {
      if (err){
        res.status(500).send(err);
      }else {
        candidato.nome      = req.body.nome     || candidato.nome;
        candidato.cpf       = req.body.cpf      || candidato.cpf;
        candidato.telefone  = req.body.telefone || candidato.telefone;
        candidato.endereco  = req.body.endereco || candidato.endereco;
        candidato.sexo      = req.body.sexo     || candidato.sexo;
        candidato.idade     = req.body.idade    || candidato.idade;
        candidato.save((err, candidato) =>{
            if(err){
              res.status(500).send(err)
            }else {
              res.status(200).send(candidato)
            }
        });
      }
    });
};

module.exports.deletarCandidato = function(req, res){
  Candidato
    .findByIdAndRemove(req.params.id)
    .exec(function(err, result){
      if (err){
        console.log("Erro ao delatar o Candidato.");
        res
          .status(500)
          .json(err);
      } else {
        res
          .json(result);
      }
    });

};

module.exports.login = function(req, res) {
  var usuario  = req.body.usuario;
  var senha    = req.body.senha;
  var sta = '';

  Candidato.findOne({
    usuario: usuario
  }).exec(function(err, user) {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    }else if (!user){
      console.log("User not found.");
      res.status(404).json('Unauthorized');
    } else {
      if (bcrypt.compareSync(senha, user.senha)) {
        console.log('User found', user);
        var token = jwt.sign({ usuario: user.usuario }, 's3cr3t', { expiresIn: 3600 });
        res.status(200).json({success: true, token: token});
      } else {
        res.status(401).json('Unauthorized');
      }
    }
  });
};

module.exports.authenticate = function(req, res, next) {
  var headerExists = req.headers.authorization;
  if (headerExists) {
    var token = req.headers.authorization.split(' ')[1]; //--> Authorization Bearer xxx
    jwt.verify(token, 's3cr3t', function(error, decoded) {
      if (error) {
        console.log(error);
        res.status(401).json('Unauthorized');
      } else {
        req.user = decoded.username;
        next();
      }
    });
  } else {
    res.status(403).json('No token provided');
  }
};
