import * as SQLite from 'expo-sqlite';

export function getDbConnection() {
    const cx = SQLite.openDatabase('dbMoviesApp.db');
    return cx;
}

export async function createTable() {
    return new Promise((resolve, reject) => {
        const query1 = `CREATE TABLE IF NOT EXISTS tbUsers
          (
              id INTEGER not null primary key AUTOINCREMENT,
              accountName text not null,
              password text not null,
              email text not null         
          );`;
        const query2 = ` CREATE TABLE IF NOT EXISTS tbMovies
          (
              id INTEGER not null primary key AUTOINCREMENT,
              movieName text not null,
              category text not null,
              price decimal(5,2) not null,
              description text not null,
              sessionDate text not null
          );`;
        const query3 = `CREATE TABLE IF NOT EXISTS tbOrdes
          (
              id INTEGER not null primary key AUTOINCREMENT,
              userId text not null,
              totalPrice decimal(5,2) not null,
              paymentMethod text not null,
              movieId text not null,
              FOREIGN KEY (userId) REFERENCES tbUsers (userId),
              FOREIGN KEY (movieId) REFERENCES tbMovies (movieId),
              FOREIGN KEY (paymentMethod) REFERENCES tbPayments (paymentMethod)
          );`;
        const query4 = `CREATE TABLE IF NOT EXISTS tbPayments
          (
              id INTEGER not null primary key AUTOINCREMENT,
              methodName text not null            
          );`;
        let dbCx = getDbConnection();        
        
        dbCx.transaction(tx => {
            tx.executeSql(query1);
            resolve(true); 
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
        dbCx.transaction(tx => {
            tx.executeSql(query2);
            resolve(true); 
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
        dbCx.transaction(tx => {
            tx.executeSql(query3);
            resolve(true); 
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
        dbCx.transaction(tx => {
            tx.executeSql(query4);
            resolve(true); 
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
}

export function getAllMovies() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbMovies';
            tx.executeSql(query, [],
                (tx, records) => {

                    var response = []

                    for (let n = 0; n < records.rows.length; n++) {
                        let obj = {
                            id: records.rows.item(n).id,
                            movieName: records.rows.item(n).movieName,
                            category: records.rows.item(n).category,
                            price: records.rows.item(n).price,
                            sessionDate: records.rows.item(n).sessionDate
                        }
                        response.push(obj);
                    }
                    resolve(response);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function addMovie(movie) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbMovies (movieName, category, price, description, sessionDate) values (?,?,?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [movie.movieName, movie.category, movie.price, movie.description, movie.sessionDate],
                (tx, response) => {
                    resolve(response.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function updateMovie(movie) {
    return new Promise((resolve, reject) => {
        let query = 'update tbMovies set movieName=?, category=?, price=?, description=?, sessionDate=? where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [movie.movieName, movie.category, movie.price, movie.description, movie.sessionDate, movie.id],
                (tx, response) => {
                    resolve(response.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function deleteOrder(id) {
    return new Promise((resolve, reject) => {
        let query = 'delete from tbOrdes where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [id],
                (tx, response) => {
                    resolve(Response.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function deleteMovie(id) {
    return new Promise((resolve, reject) => {
        let query = 'delete from tbMovies where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [id],
                (tx, response) => {
                    resolve(Response.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function addUser(user) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbUsers (accountName, password, email) values (?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [user.accountName, user.password, user.email],
                (tx, response) => {
                    resolve(response.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function getUser(user) {
    console.log('getUser');
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM tbUsers WHERE (accountName = ? OR email = ?) AND password = ?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [user.emailOrUsername, user.emailOrUsername, user.password],
                (tx, response) => {

                    var retorno = [];
                    
                    for (let n = 0; n < response.rows.length; n++) {
                        let obj = {
                            id: response.rows.item(n).id,
                            nome: response.rows.item(n).accountName,
                            email: response.rows.item(n).email
                        }
                        retorno.push(obj);
                    }
                    console.log('retorno: ');
                    console.log(retorno);
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function getAllUser() {
    console.log('getAllUser');
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM tbUsers';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query,
                (tx, response) => {

                    var retorno = [];
                    
                    for (let n = 0; n < response.rows.length; n++) {
                        let obj = {
                            id: response.rows.item(n).id,
                            nome: response.rows.item(n).accountName,
                            email: response.rows.item(n).email
                        }
                        retorno.push(obj);
                    }
                    
                    console.log('retorno: ');
                    console.log(retorno);
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}