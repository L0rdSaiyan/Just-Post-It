const db = require("./connection");
const Users = require('./users');
const Posts = require('./posts');

const Comments = db.sequelize.define('comments', {
    authorName: {         
        type: db.Sequelize.STRING,
        references: {
            model: Users,
            key: 'name'
        }
    },
    postId: {
        type: db.Sequelize.INTEGER,
        references: {
            model: Posts,
            key: 'id'
        }
    },
    content: {
        type: db.Sequelize.STRING,
    }
});


// Comments.sync({ force: true })
//   .then(() => console.log('success'))
//   .catch((error) => console.log(error));

module.exports = Comments;
