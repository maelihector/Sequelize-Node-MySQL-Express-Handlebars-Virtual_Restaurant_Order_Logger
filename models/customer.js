module.exports = function (sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    leftTable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  // Associate Customer with Orders
  Customer.associate = function (models) {

    Customer.belongsTo(models.Table, {
      foreignKey: {
        allowNull: false
      }
    });

    Customer.hasMany(models.Order);

  }

  return Customer;
};