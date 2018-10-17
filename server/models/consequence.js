module.exports = function(sequelize, DataTypes) {
  return sequelize.define("consequence", {
    consequencedata: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};
