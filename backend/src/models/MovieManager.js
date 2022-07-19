const AbstractManager = require("./AbstractManager");

class MovieManager extends AbstractManager {
  static table = "movie";

  insert(movie) {
    return this.connection.query(
      `insert into ${MovieManager.table} (id_IMDB) values (?)`,
      [movie.id_IMDB]
    );
  }

  update(movie) {
    return this.connection.query(
      `update ${MovieManager.table} set ? where id = ?`,
      [movie]
    );
  }
}

module.exports = MovieManager;
