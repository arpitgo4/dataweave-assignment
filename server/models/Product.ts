
import Sequelize from 'sequelize';
import sequelize_connection from '../config/mysql';

const Product = sequelize_connection.define('products', {
    urlh: { type: Sequelize.STRING, allowNull: false, primaryKey: true, },
    status: { type: Sequelize.INTEGER, allowNull: true, },
    brand: { type: Sequelize.STRING, allowNull: true, },
    category: { type: Sequelize.STRING, allowNull: true, },
    subcategory: { type: Sequelize.STRING, allowNull: true, },
    product_type: { type: Sequelize.STRING, allowNull: true, },
    sku: { type: Sequelize.STRING, allowNull: true, },
    title: { type: Sequelize.STRING, allowNull: false, },
    url: { type: Sequelize.STRING, allowNull: false, },
    source: { type: Sequelize.STRING, allowNull: false, },
    seller: { type: Sequelize.STRING, allowNull: true, },
    crawl_date: { type: Sequelize.DATE, allowNull: true, },
    crawl_time: { type: Sequelize.DATE, allowNull: true, },
    mrp: { type: Sequelize.FLOAT, allowNull: true, },
    available_price: { type: Sequelize.FLOAT, allowNull: true, },
    discount: { type: Sequelize.FLOAT, allowNull: true, },
    stock: { type: Sequelize.STRING, allowNull: true, },
}, { freezeTableName: true , timestamps: false, });


export {
    Product,
};