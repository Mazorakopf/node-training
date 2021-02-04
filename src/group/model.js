export default (sequelize, DataTypes) => {
    const Group = sequelize.define('group', {
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
    });

    Group.associate = models => {
        Group.belongsToMany(models.Permission, {
            through: 'group_permission'
        });
        Group.belongsToMany(models.User, {
            through: 'user_group'
        });
    };

    return Group;
};
