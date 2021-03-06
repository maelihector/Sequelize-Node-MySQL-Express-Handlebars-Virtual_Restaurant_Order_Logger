module.exports = function (sequelize, DataTypes) {
  var Order = sequelize.define("Order", {
    // Giving the Order model a name of type STRING
    order_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  // Associate each Order with a Customer
  Order.associate = function (models) {

    Order.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false
      }
    });

  };

  return Order;
};