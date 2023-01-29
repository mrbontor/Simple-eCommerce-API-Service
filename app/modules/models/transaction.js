module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define(
        'Transaction',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            idUser: {
                type: DataTypes.INTEGER
            },
            invoice: {
                type: DataTypes.STRING
            },
            details: {
                type: DataTypes.JSON
            },
            total: {
                type: DataTypes.DECIMAL(10, 2),
                default: 0.0,
                get() {
                    const value = this.getDataValue('total');
                    return value === null ? null : parseFloat(value);
                }
            },
            amountPaid: {
                type: DataTypes.DECIMAL(10, 2),
                get() {
                    const value = this.getDataValue('amountPaid');
                    return value === null ? null : parseFloat(value);
                }
            },
            status: {
                type: DataTypes.ENUM,
                values: ['pending', 'failed', 'cancelled', 'done'],
                default: 'pending'
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
            tableName: 'transaction',
            timestamps: true,
            underscored: false
        }
    );

    Transaction.associate = function associate(models) {
        Transaction.belongsTo(models.User, {
            foreignKey: 'idUser',
            allowNull: false,
            as: 'user'
            // constraints: false,
        });
    };

    return Transaction;
};
