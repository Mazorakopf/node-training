import Sequelize from 'sequelize';
import config from 'config';
import user from '../user/model';
import group from '../group/model';
import permission from '../permission/model';

export const sequelize = new Sequelize(
    config.get('database.server'),
    config.get('database.username'),
    config.get('database.password'),
    {
        host: config.get('database.host'),
        dialect: config.get('database.dialect'),
        define: {
            timestamps: false,
            underscored: true,
            schema: 'training'
        }
    }
);

const models = {
    User: user(sequelize, Sequelize.DataTypes),
    Group: group(sequelize, Sequelize.DataTypes),
    Permission: permission(sequelize, Sequelize.DataTypes)
};

Object.keys(models).forEach((name) => {
    if ('associate' in models[name]) {
        models[name].associate(models);
    }
});

export const { User, Group, Permission } = models;
export default models;
