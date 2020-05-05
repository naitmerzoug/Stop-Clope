'use strict'
const Sqlite = require('better-sqlite3');
var fs = require('fs');

//Connexion à la BdD Sqlite
let db = new Sqlite('db.sqlite');
  
  //Création des tables 
var create_bdd = function() {
  db.prepare('DROP TABLE IF EXISTS user').run();
  db.prepare('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT)').run();
  db.prepare('INSERT INTO user VALUES (@id, @username, @email, @password)');

  db.prepare('DROP TABLE IF EXISTS compteur').run();
  db.prepare('CREATE TABLE compteur(id INTEGER PRIMARY KEY AUTOINCREMENT, pseudo VARCHAR, jourstop INTEGER, moisstop VARCHAR, anneestop INTEGER, cpd INTEGER, objectif INTEGER, depense INTEGER, benef INTEGER)').run();
  db.prepare('INSERT INTO compteur VALUES (@id, @pseudo, @jourstop, @moisstop, @anneestop, @cpd, @objectif, @depense, @benef)');
  
  
  
} 
create_bdd();