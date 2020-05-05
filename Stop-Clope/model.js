'use strict'
const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');

exports.login = (email, password) => {
    var login = db.prepare('SELECT id FROM user WHERE (email = ? AND password = ?)').get(email, password);
    if(login == undefined) return -1;
    return login;
}

exports.new_user = (username, email, password) => {
    var add = db.prepare('INSERT INTO user (username, email, password) VALUES (?, ?, ?)').run(username, email, password);
    return add.lastInsertRowid;
}

exports.create =  (pseudo, jourstop, moisstop, anneestop, cpd, objectif, depense) => {

    var postCreate = db.prepare('INSERT INTO compteur (pseudo, jourstop, moisstop, anneestop, cpd, objectif, depense) VALUES (?, ?, ?, ?, ?, ?, ?)').run(pseudo, jourstop, moisstop, anneestop, cpd, objectif, depense);
    

    return postCreate.lastInsertRowid;
}

exports.read = (id) => {
	
	var found = db.prepare('SELECT * FROM compteur WHERE id = ?').get(id);
  
    return found;
};

exports.delete = function(id) {
  db.prepare('DELETE FROM compteur WHERE id = ?').run(id);

}



 



