export default (sequelize, DataTypes) => {
    const Permission = sequelize.define('permission', {
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
    });

    Permission.associate = models =>
        Permission.belongsToMany(models.Group, {
            through: 'group_permission'
        });

    return Permission;
};
