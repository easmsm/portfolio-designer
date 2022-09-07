const Project = require('./project');
const User = require('./user');

User.hasMany(Project, {
    foreignKey: 'user_id'
});

Project.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { Project, User };