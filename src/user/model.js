import { DataTypes } from 'sequelize';
import database from '../utils/database';

const UserModel = database.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    login: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false,
        validate: { isEmail: true }
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false,
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
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull:false
    }
}, {
    timestamps: false,
    schema: 'training'
});

UserModel.sync();

export default UserModel;

