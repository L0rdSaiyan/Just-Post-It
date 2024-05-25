const db = require('./connection')
const Users = require("./users")

const Posts = db.sequelize.define("posts",
    {
        titulo: 
        {
            type:  db.Sequelize.STRING
        },
        conteudo:
        {
            type: db.Sequelize.STRING
        },
        author:
        {
            type: db.Sequelize.STRING,
            references:
            {
                model: Users,
                key: 'name'
            }
        }

    }
)

// Posts.sync({force:true}).then(()=>{
//     console.log('deu bom')
// }).catch((error)=>
// {
//     console.log('deu b.o aí')
// })

module.exports = Posts