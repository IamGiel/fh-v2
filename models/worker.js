var validator = require('validator');
var bcrypt = require("bcrypt-nodejs");


module.exports = function (sequelize, DataTypes) {

    var Worker = sequelize.define("Worker", {
        url_link: {
            type: DataTypes.TEXT,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     isAlpha: { msg: "--<@@@@@@ NO NUMBERS @@@@@@>--"}
            //     } 
        },
        
        zip_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            isUnique: true,
            allowNull: false,
            validator: { isEmail: true }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        service: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {len: [1] }
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: { len: [1] }
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        }
    }, {
            timestamps: false,
            freezeTableName: true
        },
    );
        Worker.prototype.validPassword = function (password) {
            return bcrypt.compareSync(password, this.password);
        };
        // Hooks are automatic methods that run during various phases of the User Model lifecycle
        // In this case, before a User is created, we will automatically hash their password
        Worker.hook("beforeCreate", function (worker) {
            worker.password = bcrypt.hashSync(worker.password, bcrypt.genSaltSync(10), null);
        });
    return Worker;
    
}
