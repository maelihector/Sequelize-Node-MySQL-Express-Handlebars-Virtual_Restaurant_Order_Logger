module.exports = function(sequelize, DataTypes) {
  var Table = sequelize.define("Table", {
    table_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  
  // Associate Table with Customer
  Table.associate = function(models){
    Table.hasMany(models.Customer);
  }

  return Table;
};