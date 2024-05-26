const db = require('./connection')
const Users = require("./users")


const Posts = db.sequelize.define('posts', {
    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.STRING
    },
    authorName: {
        type: db.Sequelize.STRING,
        references: {
            model: Users,
            key: 'name'
        }
    }
});

// Associações
// Users.hasMany(Posts, { foreignKey: 'authorName', sourceKey: 'name' });
// Posts.belongsTo(Users, { foreignKey: 'authorName', targetKey: 'name' });

// Posts.sync({force:true}).then(()=>{
//     console.log('deu bom')
// }).catch((error)=>
// {
//     console.log('deu b.o aí')
// })

module.exports = Posts