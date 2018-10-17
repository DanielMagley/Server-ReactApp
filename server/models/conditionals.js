module.exports = function(sequelize, DataTypes) {
  return sequelize.define("conditionals", {
    anytimedata: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};
