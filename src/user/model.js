export default (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        login: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: { isEmail: true }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 20],
                is: /[a-zA-Z0-9]/
            }
        },
        age: {
            type: DataTypes.INTEGER,
            validate: {
                min: 4,
                max: 130
            }
        },
        isDeleted: {
            field: 'is_deleted',
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    });

    User.associate = (models) =>
        User.belongsToMany(models.Group, {
            through: 'user_group'
        });

    return User;
};
