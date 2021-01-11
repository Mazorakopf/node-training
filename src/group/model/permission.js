import { DataTypes } from 'sequelize';
import database from '../../utils/database';

const PermissionModel = database.define('Permission', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.ENUM,
        values: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
    }
}, {
    timestamps: false,
    schema: 'training'
});

PermissionModel.associate = models =>
    PermissionModel.belongsToMany(models.Group, {
        through: 'Group_Permission'
    });

PermissionModel.sync();

export default PermissionModel;
