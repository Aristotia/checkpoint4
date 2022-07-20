const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  static table = "user";

  findByPseudo(pseudo) {
    return this.connection.query(
      `select * from ${UserManager.table} where pseudo = ?`,
      [pseudo]
    );
  }

  insert(user) {
    return this.connection.query(
      `insert into ${UserManager.table} (pseudo, email, password) values (?, ?, ?)`,
      [user.pseudo, user.email, user.password]
    );
  }

  update(user) {
    return this.connection.query(
      `update ${UserManager.table} set ? where id = ?`,
      [user, user.id]
    );
  }
}

module.exports = UserManager;
