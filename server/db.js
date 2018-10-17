const Sequelize = require("sequelize");

const sequelize = new Sequelize("serverproject", "postgres", "Postgres2035!", {
  host: "localHost",
  dialect: "postgres"
});
sequelize.authenticate().then(
  () => {
    console.log("Connected to project database");
  },
  err => console.log(err)
);

module.exports = sequelize;
