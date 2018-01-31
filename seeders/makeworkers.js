'use strict';

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Workers', [{"name":"Victor Orr","zip_code":"43957","email":"nulla.Cras.eu@Inlorem.net","phone":"(577) 480-8887","service":"pulvinar arcu et pede. Nunc sed"}],
     {});
  },

  down : function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Users', [{
      name :''
    }])
  }
};


