module.exports = (sequelize, DataTypes) => {
    const Setting = sequelize.define("Setting", {
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      }, 
      contact_email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      favicon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      website_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      social_media_links: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      whatsapp_chat_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
   
    return Setting;
  };
  