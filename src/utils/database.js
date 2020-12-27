import Sequelize from 'sequelize';
import config from 'config';

export default new Sequelize(
    config.get('database.server'),
    config.get('database.username'),
    config.get('database.password'),
    {
        host: config.get('database.host'),
        dialect: config.get('database.dialect')
    }
);
