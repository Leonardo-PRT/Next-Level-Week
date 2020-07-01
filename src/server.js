const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")

//configurar pasta public
server.use(express.static("public"))

//habilitar o uso do req.body
server.use(express.urlencoded({extended: true}))

//utilizando temaplate engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true 
})

//configurar cominhos da minha aplicação
//página inicial
//req: requisição
//resp: resposta
server.get("/", (req, res) => {
    return res.render("index.njk", { title: "Um titulo"})
})

server.get("/create-point", (req, res) => {

    //console.log(req.query)
    return res.render("create-point.njk")
})

server.post("/savepoint", (req, res) => {
    //req.body: o corpo do nosso formulário
    //console.log(req.body)
    //return res.send("ok")

    //inserir dados no banco de dados
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
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.njk", {saved: true})
    }
    db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == ""){
        //pesquisa vazia
        return res.render("search-results.njk", { total: 0 })
    }



    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city  LIKE '%${search}%'`, function(err, rows){
        if (err) {
            return console.log(err)
        }
        const total = rows.length
        //mostrar a pag html com os dados do banco de dados
        return res.render("search-results.njk", {places: rows, total: total })
    })

    
})

//ligar o servidor
server.listen(3000)
