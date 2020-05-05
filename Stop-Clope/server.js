'use strict'


var express = require('express');
var mustache = require('mustache-express');

var model = require('./model');
var fs = require('fs');
var app = express();

const cookieSession = require('cookie-session');
app.use(cookieSession({
  secret: 'mot-de-passe-du-cookie',
}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './views');


app.get('/', is_authenticated, (req, res) => {
    var id = req.session.user;
    
    res.render('index');
});


app.get('/login', is_authenticated, (req, res) => {
    
        res.render('page-utilisateur');
    }
);

app.get('/index', is_authenticated, (req, res) => {
    
        res.render('index');
    }
);

app.post('/login', is_authenticated, (req, res) => {
    var user = model.login(req.body.email, req.body.password);
    if (user == -1) { 
        res.redirect('login'); 
    } else {
        let userID = user.id;
        req.session.user = userID;
        res.redirect('/');
    }
});

// Renvoie le formulaire d'inscription create-new-user

app.get('/create-new-user', (req, res) => {
    res.render('create-new-user');
});

app.get('/compteur', (req, res) => {
    res.render('compteur');
});

  
//Ajoute l'utilisateur à la BdD
app.post('/create-new-user', (req, res) => {
    var id = model.new_user(req.body.username, req.body.email,req.body.password);
    if (id === undefined) { res.redirect('/create-new-user'); }
    req.session.user = id;
    res.redirect('/');
});


//Désauthentifie l'utilisateur 
app.get('/Deconnexion', is_authenticated_admin, (req, res) => {
    req.session.user = null;
    res.locals.authenticated = false;
    res.redirect('/');
});



app.get('/compteur', is_authenticated_admin, (req, res) => {
    res.render('compteur');
});

app.get('/conseils', (req, res) => {
    res.render('conseils');
});


app.post('/compteur', is_authenticated_admin, (req, res) => {
    var id = model.create(req.body.pseudo, req.body.jourstop, req.body.moisstop, req.body.anneestop, req.body.cpd, req.body.objectif, req.body.depense);
    
    if(id == undefined){
        res.redirect('compteur');

    } else {
        res.redirect('/bilan/'+ id);
    }

});



app.get('/bilan/:id', (req, res) => {
  var entry = model.read(req.params.id);
  


  res.render('bilan', entry);
});

app.get('/delete/:id', is_authenticated, (req, res) => {
  var entry = model.read(req.params.id);
  res.render('delete', {id: req.params.id, pseudo: entry.pseudo});
});

app.post('/delete/:id', is_authenticated, (req, res) => {
  model.delete(req.params.id);
  res.redirect('/');
});
// Contrôle d'accès

function is_authenticated(req, res, next) {
    if (req.session.user != null) { 
      res.locals.authenticated = true; 
    } else { 
      res.locals.authenticated = false; 
    }
    next();
};
  
function is_authenticated_admin(req, res, next) {
    if (req.session.user == null) { 
      res.status(401).send("authentication Required !"); 
    } else { 
        next();
    } 
};

//Lancement du serveur
app.listen(1500, () => console.log('app listening on port http://localhost:1500'));