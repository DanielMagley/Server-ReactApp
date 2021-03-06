const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_URL ||
    `postgresql://postgres:${encodeURIComponent(
      process.env.PASS
    )}@localhost/serverproject`,
  {
    dialect: "postgres"
  }
);
sequelize.authenticate().then(
  () => {
    console.log("Connected to project database");
  },
  err => console.log(err)
);

module.exports = sequelize;
