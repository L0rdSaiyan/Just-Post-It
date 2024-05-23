const db = require("./connection.js")

const Users = db.sequelize.define("users",
    {
        name:
        {
            type: db.Sequelize.STRING,
            unique: true
        },
        senha:
        {
           type: db.Sequelize.STRING 
        }
    }
)

// Users.sync({force:true})
module.exports = Users