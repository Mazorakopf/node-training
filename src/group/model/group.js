import { DataTypes } from 'sequelize';
import database from '../../utils/database';

const GroupModel = database.define('Group', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    timestamps: false,
    schema: 'training'
});

GroupModel.associate = models =>
    GroupModel.belongsToMany(models.Permission, {
        through: 'Group_Permission',
        as: 'permissions'
    });

GroupModel.sync();

export default GroupModel;
