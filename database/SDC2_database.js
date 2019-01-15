const Sequelize = require('sequelize');

const db = new Sequelize('relatedtracks', 'adminjoon', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
});

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// "Categories" here is an ORM object you can work with & "categories" here is a Table-name

// Categories Model
const Categories = db.define(
  'categories',
  {
    name: Sequelize.STRING,
  },
  { timestamps: false },
);

// Products Model
const Products = db.define(
  'products',
  {
    name: Sequelize.STRING,
    price: Sequelize.DECIMAL(6, 2),
    imageURL: Sequelize.STRING,
    categoryName: Sequelize.STRING,
  },
  { timestamps: false },
);

Categories.hasMany(Products, {
  foreignKey: 'categoryName',
  sourceKey: 'name',
  constraints: false,
});
Products.belongsTo(Categories, {
  foreignKey: 'categoryName',
  targetKey: 'name',
  constraints: false,
});

// Accessories Model
const Accessories = db.define(
  'accessories',
  {
    name: Sequelize.STRING,
    price: Sequelize.DECIMAL(6, 2),
    imageURL: Sequelize.STRING,
    categoryName: Sequelize.STRING,
  },
  { timestamps: false },
);

Categories.hasMany(Accessories, {
  foreignKey: 'categoryName',
  sourceKey: 'name',
  constraints: false,
});
Accessories.belongsTo(Categories, {
  foreignKey: 'categoryName',
  targetKey: 'name',
  constraints: false,
});

// ViewHistory Model
const ViewHistory = db.define('viewHistory', {
  name: Sequelize.STRING,
  productID: Sequelize.INTEGER,
  price: Sequelize.DECIMAL(6, 2),
  imageURL: Sequelize.STRING,
  categoryName: Sequelize.STRING,
});

// database Object.sync does all the syncs

db.sync().catch(() => {
  console.log('There was an error syncing');
});

module.exports = {
  db,
  ViewHistory,
  Products,
  Categories,
  Accessories,
};
