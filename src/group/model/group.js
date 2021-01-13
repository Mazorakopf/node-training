export default (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
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

    Group.associate = models =>
        Group.belongsToMany(models.Permission, {
            through: 'Group_Permission',
            as: 'permissions'
        });

    return Group;
};
