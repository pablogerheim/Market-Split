module.exports = {
        up: async(queryInterface, Sequelize) => {
            await queryInterface.createTable('Person', {
                name: Sequelize.STRING,
                isBetaMember: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                    allowNull: false
                }
            });
        },

        down: async(queryInterface, Sequelize) => {
            await queryInterface.dropTable('user');
        }
    }
    //verificar problema verção do ES