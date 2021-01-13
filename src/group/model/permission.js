export default (sequelize, DataTypes) => {
    const Permission = sequelize.define('Permission', {
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

    Permission.associate = models =>
        Permission.belongsToMany(models.Group, {
            through: 'Group_Permission'
        });
};
