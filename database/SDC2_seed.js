const faker = require('faker');
const {
  db, Accessories, Categories, Products, ViewHistory,
} = require('./index.js');

const categoriesData = (function data() {
  const categories = ['appleTablets', 'non_Apple_Tablets', 'random'];

  return categories;
}());

const productsData = (function data() {
  const products = {
    appleTablets: [
      {
        name: 'Apple iPad Pro 11" Wi-Fi Only (2018 Model, 3rd Generation)',
        price: 799.99,
        imageURL:
          'https://target.scene7.com/is/image/Target/54081265?wid=250&hei=250&qlt=80&fmt=webp',
      },
      {
        name: 'Apple iPad mini 4 Wi-Fi Only (2015 model)',
        price: 399.99,
        imageURL:
          'https://target.scene7.com/is/image/Target/50218097?wid=250&hei=250&qlt=80&fmt=webp',
      },
      {
        name: 'Apple iPad Pro 10.5" Wi-Fi Only (2017 Model)',
        price: 699.99,
        imageURL:
          'https://target.scene7.com/is/image/Target/52652493?wid=250&hei=250&qlt=80&fmt=webp',
      },
      {
        name:
          'SuprJETech iPad 9.7" (2017 Model) Slim-Fit Smart Case Cover with Auto-Sleep & Wake Feature',
        price: 12.99,
        imageURL:
          'https://target.scene7.com/is/image/Target/GUEST_2ee190df-cf71-4e03-abc6-c126630b8f0a?wid=325&hei=325&qlt=80&fmt=webp',
      },
      {
        name: 'Apple Smart Keyboard for 10.5" iPad Pro - US English',
        price: 143.99,
        imageURL:
          'https://target.scene7.com/is/image/Target/GUEST_990e73d1-cbe1-4fec-917e-021db250f5d0?wid=325&hei=325&qlt=80&fmt=webp',
      },
      {
        name: 'iKlip Studio Stand for iPad - Black (IKLIPSTUDI)',
        price: 29.99,
        imageURL:
          'https://target.scene7.com/is/image/Target/GUEST_eecd22c4-e14d-4b4c-84ba-61d30e71103b?wid=325&hei=325&qlt=80&fmt=webp',
      },
    ],
    non_Apple_Tablets: [
      {
        name: 'Fellowes Tablet Riser, 8 3/8 x 5 3/8 x 4 5/8, Black/Gray',
        price: 11.69,
        imageURL:
          'https://target.scene7.com/is/image/Target/GUEST_2034b488-8b70-4a97-ab2e-f04b4d6fcd98?wid=253&hei=253&qlt=80&fmt=webp',
      },
      {
        name:
          'For Samsung Galaxy Tab E Lite 7.0 / Tab 3 Lite 7.0 Tablet Kiddie Case Lightweight Shock Proof Stand Cover, Blue',
        price: 49.99,
        imageURL:
          'https://i5.walmartimages.com/asr/6a6aa026-042c-46e3-a5ce-131a9a3974db_1.665e9610a19f71541a39aa93a8c1d748.jpeg?odnWidth=180&odnHeight=180&odnBg=ffffff',
      },
      {
        name: 'Samsung Galaxy Tab A 10.1" Tablet Wi-Fi, White - 16GB',
        price: 279.99,
        imageURL:
          'https://target.scene7.com/is/image/Target/50790686?wid=250&hei=250&qlt=80&fmt=webp',
      },
      {
        name: 'Samsung Galaxy Tab E 9.6" 16GB Black - SM-T560NZKUXAR',
        price: 199.99,
        imageURL:
          'https://target.scene7.com/is/image/Target/GUEST_93d4a817-7351-4bb6-b317-5093c09c8422?wid=325&hei=325&qlt=80&fmt=webp',
      },
      {
        name:
          'Amazon Fire HD 10 Tablet with Alexa Hands-Free, 10.1" 1080p Full HD Display, Black - with Special Offers',
        price: 119.99,
        imageURL:
          'https://target.scene7.com/is/image/Target/GUEST_e6645050-cf6a-42f3-8784-b16e3d0d1b99?wid=325&hei=325&qlt=80&fmt=webp',
      },
      {
        name: 'Fire HD 8 Tablet 8" HD Display (with Special Offers)',
        price: 79.99,
        imageURL:
          'https://target.scene7.com/is/image/Target/GUEST_a3289840-3f86-44d3-9fa6-485f6d9bd664?wid=325&hei=325&qlt=80&fmt=webp',
      },
    ],
    random: [],
  };

  for (let i = 1; i <= 88; i++) {
    products.random.push({
      name: faker.commerce.productName(),
      price: faker.finance.amount(),
      imageURL: faker.random.image(),
    });
  }

  return products;
}());

const accessoriesData = (function data() {
  const accessories = {
    appleTablets: [
      {
        name: 'Apple Pencil 1st Generation',
        price: 99.99,
        imageURL:
          'https://target.scene7.com/is/image/Target/50220026?wid=250&hei=250&qlt=80&fmt=pjpeg',
      },
      {
        name: 'Apple Lightning to USB Cable (2m)',
        price: 29.99,
        imageURL:
          'https://target.scene7.com/is/image/Target/50512957?wid=250&hei=250&qlt=80&fmt=webp',
      },
      {
        name: 'Apple AirPods',
        price: 159.99,
        imageURL:
          'https://target.scene7.com/is/image/Target/52106337?wid=250&hei=250&qlt=80&fmt=webp',
      },
      {
        name: 'Apple Wired Earpods',
        price: 29.99,
        imageURL:
          'https://target.scene7.com/is/image/Target/51530146?wid=250&hei=250&qlt=80&fmt=webp',
      },
      {
        name: 'Apple Lightning to Digital AV Adapter',
        price: 49.99,
        imageURL:
          'https://target.scene7.com/is/image/Target/51677595?wid=250&hei=250&qlt=80&fmt=webp',
      },
    ],
    non_Apple_Tablets: [
      {
        name: 'Targus New Stylus for Tablets/Other Touch Screen - Black (AMM165US)',
        price: 8.99,
        imageURL:
          'https://target.scene7.com/is/image/Target/GUEST_cdfec344-3212-450a-8e51-556adef8ed7e?wid=253&hei=253&qlt=80&fmt=webp',
      },
      {
        name: "Skullcandy Ink'd Wired Earbuds With Microphone",
        price: 9.69,
        imageURL:
          'https://target.scene7.com/is/image/Target/GUEST_1be1b35c-ce83-4b4d-bb9f-de8a3ed36ed9?wid=253&hei=253&qlt=80&fmt=webp',
      },
      {
        name: 'Ematic Tablet Accessory Kit with Speaker (EP218)',
        price: 12.99,
        imageURL:
          'https://i5.walmartimages.com/asr/1e599ee6-6370-40d2-9732-e22cd32a1695_1.f4d7f1d06e4a51bd7bbb71bdec29be6e.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
      },
      {
        name: 'Beats X Wireless Earphones - Silver',
        price: 119.99,
        imageURL:
          'https://target.scene7.com/is/image/Target/54137609?wid=250&hei=250&qlt=80&fmt=webp',
      },
      {
        name: 'Atomi - Mini Surge Protector',
        price: 14.99,
        imageURL:
          'https://target.scene7.com/is/image/Target/GUEST_47d6abe9-e38d-4f49-a8f7-04f24dd3b7ac?wid=325&hei=325&qlt=80&fmt=webp',
      },
    ],
    random: [],
  };

  for (let i = 1; i <= 5; i++) {
    accessories.random.push({
      name: faker.commerce.productName(),
      price: faker.finance.amount(),
      imageURL: faker.random.image(),
    });
  }

  return accessories;
}());

db.sync({ force: true })
  .then(() => {
    categoriesData.forEach((categoryItem) => {
      Categories.create({
        name: categoryItem,
      })
        .then((category) => {
          const categoryName = category.get('name');

          productsData[categoryName].forEach((product) => {
            Products.create({
              name: product.name,
              price: product.price,
              imageURL: product.imageURL,
              categoryName: category.get('name'),
            });
          });

          accessoriesData[categoryName].forEach((accessory) => {
            Accessories.create({
              name: accessory.name,
              price: accessory.price,
              imageURL: accessory.imageURL,
              categoryName: category.get('name'),
            });
          });
        })
        .then(() => console.log('worked!'));
    });

    ViewHistory.create({
      name: 'Apple iPad 9.7" Wi-Fi Only (2018 Model, 6th Generation)',
      productID: 0,
      price: '499.99',
      imageURL:
        'https://target.scene7.com/is/image/Target/GUEST_358cafbc-644b-46cd-a0e3-66b8a6763a75?wid=325&hei=325&qlt=80&fmt=webp',
      categoryName: 'appleTablets',
    });
  })
  .catch(() => {
    console.log('error with syncing seeds');
  });