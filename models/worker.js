var validator = require('validator');

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


        password_hash: DataTypes.STRING,
        password: {
            type: DataTypes.VIRTUAL,
            set: function (val) {
                // Remember to set the data value, otherwise it won't be validated
                this.setDataValue('password', val);
                this.setDataValue('password_hash', this.salt + val);
            },
            validate: {
                isLongEnough: function (val) {
                    if (val.length < 2) {
                        throw new Error("Please choose a longer password")
                    }
                }
            }
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
        }
    
    );

    return Worker;
    
}
