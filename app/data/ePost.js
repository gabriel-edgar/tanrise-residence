import {Images} from '@config';

const EPostListData = [
  {
    id: 1,
    description: 'Stamp Duty - 3.000',
    title: 'Stamp Duty - 3.000',
    image: Images.productView,
    costPrice: '5.000',
    salePrice: '4.000',
    isFavorite: false,
    salePercent: '-10%',
    price: 4000,
  },
  {
    id: 2,
    description: 'Stamp Duty - 6.000',
    title: 'Stamp Duty - 6.000',
    image: Images.productView,
    costPrice: '9.000',
    salePrice: '7.000',
    isFavorite: false,
    salePercent: '-10%',
    price: 7000,
    isBestMatch: true,
  },
  // {
  //   id: 3,
  //   description: 'Shipping restrictions',
  //   title: 'Converse Chuck Taylor All Star Ox Plimsolls In Black',
  //   image: Images.productGrid02,
  //   costPrice: '$40.00',
  //   salePrice: '$50.00',
  //   isFavorite: false,
  //   salePercent: '-10%',
  //   price: 50,
  //   isBestMatch: true,
  // },
  // {
  //   id: 4,
  //   description: 'Branch New + Home Delivery',
  //   title: 'White T-Shirt with simple logo and good material',
  //   image: Images.productGrid03,
  //   costPrice: '$79.00',
  //   salePrice: '$69.00',
  //   isFavorite: false,
  //   salePercent: '-10%',
  //   price: 69,
  // },
  // {
  //   id: 5,
  //   description: 'Branch New + Home Delivery',
  //   title: 'Black T-Shirt with simple logo and good material    ',
  //   image: Images.productGrid04,
  //   costPrice: '$49.00',
  //   salePrice: '$39.00',
  //   isFavorite: false,
  //   salePercent: '-10%',
  //   price: 39,
  //   isBestMatch: true,
  // },
  // {
  //   id: 6,
  //   description: 'Branch New + Home Deliv..',
  //   title: 'White T-Shirt with simple logo and …',
  //   image: Images.productGrid05,
  //   costPrice: '$39.00',
  //   salePrice: '$29.00',
  //   isFavorite: false,
  //   salePercent: '-10%',
  //   price: 29,
  // },
];

const ESortOption = [
  {
    value: 'all',
    text: 'all',
  },
  {
    value: 'best_match',
    text: 'best_match',
  },
  {
    value: 'price_low_to_high',
    text: 'price_low_to_high',
  },
  {
    value: 'price_high_to_low',
    text: 'price_high_to_low',
  },
];

export {EPostListData, ESortOption};
