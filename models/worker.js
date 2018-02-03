var validator = require('validator');

module.exports = function (sequelize, DataTypes) {

    var Worker = sequelize.define("Worker", {
        url_link: {
            type: DataTypes.TEXT,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: { msg: "--<@@@@@@ NO NUMBERS @@@@@@>--"}
                } 
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
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        service: {
            type: DataTypes.STRING,
            allowNull: false,
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


// module.exports = function (sequelize, DataTypes) {
//     var tableName = sequelize.define("tableName", {

//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 isAlpha: { msg: "only letters please" }
//             }
//         }
//     },{ 
//             timestamps: false,
//             freezeTableName: true
//            }
//     );
    
//     return tableName;
    
// }
