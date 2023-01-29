module.exports = (sequelize, DataTypes) => {
    const Stock = sequelize.define(
        'Stock',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            idProduct: {
                type: DataTypes.INTEGER
            },
            quantity: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            price: {
                type: DataTypes.DECIMAL,
                defaultValue: 0,
                get() {
                    const value = this.getDataValue('price');
                    return value === null ? null : parseFloat(value);
                }
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        },
        {
            tableName: 'stock',
            timestamps: true,
            underscored: false
        }
    );

    Stock.associate = function associate(models) {
        Stock.belongsTo(models.Product, {
            foreignKey: 'idProduct',
            allowNull: false,
            as: 'product'
            // constraints: false,
        });
    };

    return Stock;
};
