module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM("admin", "client"),
      defaultValue: "client",
      allowNull: false,
    }, 
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return User;
};
