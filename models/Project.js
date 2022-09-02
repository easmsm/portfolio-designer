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
          'language',
          'languageColor',
          'link',
          'description',
          'stars'
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
    repo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true
      }
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    languageColor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: { 
      type: DataTypes.STRING,
      allowNull:true
    },
     stars: {
       type: DataTypes.INTEGER,
       allowNull: true
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
