const Sequelize = require("sequelize")

const sequelize = new Sequelize({
    host: "localhost",
    username: "root",
    password: "mysql193203#",
    database: "appDb",
    dialect: "mysql",
    dialectModule: require("mysql2"),
    benchmark: true
})

// const sequelize = new Sequelize("appDb", "root", "mysql193203#",
//     {
//         host: "localhost",
//         dialect: "mysql"    
//     }
// )

sequelize.authenticate()
.then(()=>
{
    console.log("conexão ao banco de dados realizada com sucesso!")
})
.catch((error)=>
{
    console.log(`ocorreu um erro: ${error}`)
})

module.exports = {
    Sequelize : Sequelize,
    sequelize : sequelize
}