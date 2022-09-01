const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');



class Project extends Model {
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      project_id: body.project_id
    }).then(() => {
      return Project.findOne({
        where: {
          id: body.p_id
        },
        attributes: [
          'id',
          'repo',
          'lanuage',
          [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE project.id = vote.project_id)'), 'vote_count']
        ],
        include: [
          {
            model: models.Comment,
            attributes: ['id', 'comment_text', 'project_id', 'user_id', 'created_at'],
            include: {
              model: models.User,
              attributes: ['username']
            }
          }
        ]
      });
    });
  }
}


Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    project_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'project'
  }
);

module.exports = Project;
