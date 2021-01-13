import Sequelize from 'sequelize';
import config from 'config';

const sequelize = new Sequelize(
    config.get('database.server'),
    config.get('database.username'),
    config.get('database.password'),
    {
        host: config.get('database.host'),
        dialect: config.get('database.dialect')
    }
);

const db = {
    User: sequelize.import('./user/model'),
    Group: sequelize.import('./group/model/group')
};

Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;

export default db;
