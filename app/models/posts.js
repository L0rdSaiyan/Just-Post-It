
const db = require("./connection");
const Users = require('./users');
const Comments = require('./comments')

const Posts = db.sequelize.define('posts', {
    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.STRING
    },
    likes : {
        type: db.Sequelize.INTEGER,
        defaultValue: 0
    },
    dislikes : {
        type: db.Sequelize.INTEGER,
        defaultValue: 0
    },
    authorName: {
        type: db.Sequelize.STRING,
        references: {
            model: Users,
            key: 'name'
        }
    }
});


// Users.hasMany(Posts, { foreignKey: 'authorName', sourceKey: 'name' });
// Posts.belongsTo(Users, { foreignKey: 'authorName', targetKey: 'name' });
 Posts.hasMany(Comments, { foreignKey: 'postId', onDelete: 'CASCADE' });

// Posts.sync({force:true}).then(()=>{
//      console.log('deu bom')
// }).catch((error)=>
//  {
//   console.log('deu b.o aí')
//  })

module.exports = Posts;