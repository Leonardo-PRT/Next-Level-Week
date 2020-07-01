//importar a sependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar o objeto que irá fazer operações banco de dados
const db = new sqlite3.Database("./src/database/database.db")
module.exports = db


//UTILIZAR O OBJET DE BANCO DE DADOS PARA NOSSAS OPERAÇÕES
/*db.serialize(() => {
    //criar uma tabela com comando sql
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT, 
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    //inserir dados na tabela com comandos sql
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Numero 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, lámpadas"
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }
        console.log("cadastrado com sucesso")
        console.log(this)
    }

    db.run(query, values, afterInsertData)

    consultar os dados da tabela com comando sql
    db.all(`SELECT * FROM places`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        console.log("Aqui estão seus registros");
        console.log(rows);
    })


    //deletar um dado da tabela com comando sql
    db.run(`DELETE FROM places WHERE id = ?`, [7], function (err) {
        if (err) {
            
            return console.log(err)
        }
        
        console.log("Registro deletado com sucesso")
        
    })

})*/