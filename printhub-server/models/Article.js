module.exports = (sequelize, DataTypes) =>{
    const Article = sequelize.define("Article",{ 
        
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description : {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        unit_price: {
            type: DataTypes.DECIMAL(10, 2), 
            allowNull: false,
        },

        quantity: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },

        image: { 
            type: DataTypes.STRING,
            allowNull: false,
        },

        // category: { 
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },  to do later , every article should belong to a specific category (paper , finished goods (products),...)


    });

    return Article;

}