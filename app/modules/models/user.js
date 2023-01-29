module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            username: {
                type: DataTypes.STRING,
                unique: 'username'
            },
            email: {
                type: DataTypes.STRING,
                unique: 'email'
            },
            infoLogin: {
                type: DataTypes.JSON
            },
            isAdmin: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            isActive: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            token: {
                allowNull: false,
                type: DataTypes.JSON,
                defaultValue: []
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
            tableName: 'user',
            timestamps: true,
            underscored: false
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['username', 'email']
                }
            ]
        }
    );
    User.associate = function associate(models) {
        User.hasMany(models.Transaction, {
            foreignKey: 'idUser',
            allowNull: false,
            as: 'transaction'
            // constraints: false,
        });
    };

    return User;
};
