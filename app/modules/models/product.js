module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        'Product',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                type: DataTypes.STRING
            },
            description: {
                type: DataTypes.TEXT
            },
            status: {
                type: DataTypes.BOOLEAN
            }
        },
        {
            tableName: 'product',
            timestamps: true,
            underscored: false
        }
    );
    Product.associate = function associate(models) {
        Product.hasOne(models.Stock, {
            foreignKey: 'idProduct',
            allowNull: false,
            as: 'stock'
        });
    };

    return Product;
};
