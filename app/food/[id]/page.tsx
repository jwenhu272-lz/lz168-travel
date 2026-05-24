'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth, AuthProvider } from '@/context/AuthContext';
import LoginModal from '@/components/LoginModal';
import BottomNav from '@/components/BottomNav';
import Logo from '@/components/Logo';
import AIChatbot from '@/components/AIChatbot';

// Complete food products data - ALL 26 products
const foodProducts = [
  // Night Market Items
  {
    id: 1,
    name: '青云烤串',
    nameEn: 'Qingyun BBQ Skewers',
    price: 15,
    originalPrice: 20,
    unit: '串',
    imageUrl: 'https://i.imgur.com/SSlCA9P.jpeg',
    seller: '青云夜市A区',
    rating: 4.8,
    reviewCount: 234,
    description: '炭火烤制，秘制酱料，外焦里嫩',
    descriptionEn:
      'Charcoal grilled, secret sauce, crispy outside tender inside',
    variants: [
      {
        id: 101,
        name: '鸡肉串',
        nameEn: 'Chicken Skewer',
        price: 12,
        originalPrice: 18,
        unit: '串',
        emoji: '🍗',
        popular: true,
      },
      {
        id: 102,
        name: '牛肉串',
        nameEn: 'Beef Skewer',
        price: 18,
        originalPrice: 25,
        unit: '串',
        emoji: '🥩',
        popular: true,
      },
      {
        id: 103,
        name: '羊肉串',
        nameEn: 'Lamb Skewer',
        price: 20,
        originalPrice: 28,
        unit: '串',
        emoji: '🐑',
        popular: false,
      },
      {
        id: 104,
        name: '五花肉串',
        nameEn: 'Pork Belly Skewer',
        price: 15,
        originalPrice: 22,
        unit: '串',
        emoji: '🥓',
        popular: false,
      },
    ],
  },
  {
    id: 2,
    name: '柳州炒螺',
    nameEn: 'Liuzhou Fried Snails',
    price: 25,
    originalPrice: 30,
    unit: '份',
    imageUrl: 'https://i.imgur.com/ipk92lv.jpeg',
    seller: '青云老字号',
    rating: 4.7,
    reviewCount: 189,
    description: '香辣入味，下酒好菜',
    descriptionEn: 'Spicy and flavorful, perfect with beer',
    variants: [
      {
        id: 201,
        name: '微辣',
        nameEn: 'Mild',
        price: 25,
        originalPrice: 30,
        unit: '份',
        emoji: '🌶️',
        popular: false,
      },
      {
        id: 202,
        name: '中辣',
        nameEn: 'Medium',
        price: 25,
        originalPrice: 30,
        unit: '份',
        emoji: '🌶️🌶️',
        popular: true,
      },
      {
        id: 203,
        name: '特辣',
        nameEn: 'Extra Hot',
        price: 25,
        originalPrice: 30,
        unit: '份',
        emoji: '🌶️🌶️🌶️',
        popular: false,
      },
      {
        id: 204,
        name: '加酸笋',
        nameEn: 'Add Pickled Bamboo',
        price: 30,
        originalPrice: 38,
        unit: '份',
        emoji: '🎋',
        popular: false,
      },
    ],
  },
  {
    id: 3,
    name: '烤生蚝',
    nameEn: 'Grilled Oysters',
    price: 30,
    originalPrice: 45,
    unit: '6只',
    imageUrl: 'https://i.imgur.com/mc0jOK7.jpeg',
    seller: '青云海鲜档',
    rating: 4.9,
    reviewCount: 456,
    description: '蒜蓉烤生蚝，新鲜肥美',
    descriptionEn: 'Garlic grilled oysters, fresh and plump',
    variants: [
      {
        id: 301,
        name: '小号 (6只)',
        nameEn: 'Small (6pcs)',
        price: 30,
        originalPrice: 45,
        unit: '份',
        emoji: '🦪',
        popular: false,
      },
      {
        id: 302,
        name: '中号 (6只)',
        nameEn: 'Medium (6pcs)',
        price: 45,
        originalPrice: 60,
        unit: '份',
        emoji: '🦪',
        popular: true,
      },
      {
        id: 303,
        name: '大号 (6只)',
        nameEn: 'Large (6pcs)',
        price: 60,
        originalPrice: 80,
        unit: '份',
        emoji: '🦪',
        popular: false,
      },
      {
        id: 304,
        name: '烤扇贝 (6只)',
        nameEn: 'Grilled Scallops (6pcs)',
        price: 45,
        originalPrice: 65,
        unit: '份',
        emoji: '🐚',
        popular: false,
      },
    ],
  },
  {
    id: 4,
    name: '青云豆腐花',
    nameEn: 'Qingyun Tofu Pudding',
    price: 8,
    originalPrice: 12,
    unit: '碗',
    imageUrl: 'https://i.imgur.com/GgGZHC3.jpeg',
    seller: '青云甜品店',
    rating: 4.6,
    reviewCount: 167,
    description: '甜咸可选，滑嫩可口',
    descriptionEn: 'Sweet or savory, silky smooth',
    variants: [
      {
        id: 401,
        name: '姜糖水',
        nameEn: 'Ginger Sugar',
        price: 8,
        originalPrice: 12,
        unit: '碗',
        emoji: '🫚',
        popular: true,
      },
      {
        id: 402,
        name: '黑糖',
        nameEn: 'Brown Sugar',
        price: 9,
        originalPrice: 13,
        unit: '碗',
        emoji: '🍬',
        popular: false,
      },
      {
        id: 403,
        name: '冰糖',
        nameEn: 'Rock Sugar',
        price: 8,
        originalPrice: 12,
        unit: '碗',
        emoji: '🍬',
        popular: false,
      },
      {
        id: 404,
        name: '红豆汤',
        nameEn: 'Red Bean Soup',
        price: 10,
        originalPrice: 15,
        unit: '碗',
        emoji: '🫘',
        popular: false,
      },
    ],
  },
  {
    id: 5,
    name: '烤茄子',
    nameEn: 'Grilled Eggplant',
    price: 12,
    originalPrice: 18,
    unit: '份',
    imageUrl: 'https://i.imgur.com/aFCBq7p.jpeg',
    seller: '青云烧烤档',
    rating: 4.5,
    reviewCount: 89,
    description: '蒜蓉烤茄子，软糯入味',
    descriptionEn: 'Garlic grilled eggplant, soft and flavorful',
    variants: [
      {
        id: 501,
        name: '原味',
        nameEn: 'Original',
        price: 12,
        originalPrice: 18,
        unit: '份',
        emoji: '🍆',
        popular: true,
      },
      {
        id: 502,
        name: '加肉末',
        nameEn: 'Add Minced Pork',
        price: 16,
        originalPrice: 24,
        unit: '份',
        emoji: '🥩',
        popular: false,
      },
      {
        id: 503,
        name: '加芝士',
        nameEn: 'Add Cheese',
        price: 18,
        originalPrice: 26,
        unit: '份',
        emoji: '🧀',
        popular: false,
      },
    ],
  },
  {
    id: 6,
    name: '炒田螺',
    nameEn: 'Stir-fried Snails',
    price: 28,
    originalPrice: 38,
    unit: '份',
    imageUrl: 'https://i.imgur.com/NIVy2T9.jpeg',
    seller: '青云螺味馆',
    rating: 4.7,
    reviewCount: 145,
    description: '紫苏炒田螺，香辣鲜美',
    descriptionEn: 'Perilla stir-fried snails, spicy and delicious',
    variants: [
      {
        id: 601,
        name: '微辣',
        nameEn: 'Mild',
        price: 28,
        originalPrice: 38,
        unit: '份',
        emoji: '🌶️',
        popular: false,
      },
      {
        id: 602,
        name: '中辣',
        nameEn: 'Medium',
        price: 28,
        originalPrice: 38,
        unit: '份',
        emoji: '🌶️🌶️',
        popular: true,
      },
      {
        id: 603,
        name: '特辣',
        nameEn: 'Extra Hot',
        price: 28,
        originalPrice: 38,
        unit: '份',
        emoji: '🌶️🌶️🌶️',
        popular: false,
      },
    ],
  },
  {
    id: 7,
    name: '铁板鱿鱼',
    nameEn: 'Teppanyaki Squid',
    price: 20,
    originalPrice: 28,
    unit: '份',
    imageUrl: 'https://i.imgur.com/mT8rzQP.jpeg',
    seller: '青云铁板烧',
    rating: 4.8,
    reviewCount: 234,
    description: '铁板鱿鱼，Q弹入味',
    descriptionEn: 'Teppanyaki squid, chewy and flavorful',
    variants: [
      {
        id: 701,
        name: '鱿鱼须',
        nameEn: 'Squid Tentacles',
        price: 20,
        originalPrice: 28,
        unit: '份',
        emoji: '🦑',
        popular: true,
      },
      {
        id: 702,
        name: '鱿鱼片',
        nameEn: 'Squid Slices',
        price: 22,
        originalPrice: 30,
        unit: '份',
        emoji: '🦑',
        popular: false,
      },
      {
        id: 703,
        name: '铁板牛肉',
        nameEn: 'Teppanyaki Beef',
        price: 32,
        originalPrice: 45,
        unit: '份',
        emoji: '🥩',
        popular: false,
      },
      {
        id: 704,
        name: '铁板鸡肉',
        nameEn: 'Teppanyaki Chicken',
        price: 25,
        originalPrice: 35,
        unit: '份',
        emoji: '🍗',
        popular: false,
      },
    ],
  },
  {
    id: 8,
    name: '现煮螺蛳粉',
    nameEn: 'Fresh Luosifen',
    price: 18,
    originalPrice: 25,
    unit: '碗',
    imageUrl: 'https://i.imgur.com/o00XI2u.jpeg',
    seller: '青云螺蛳粉总店',
    rating: 4.9,
    reviewCount: 1234,
    description: '现点现煮，正宗柳州味，酸辣鲜爽',
    descriptionEn: 'Made to order, authentic Liuzhou flavor',
    variants: [
      {
        id: 801,
        name: '标准版',
        nameEn: 'Standard',
        price: 18,
        originalPrice: 25,
        unit: '碗',
        emoji: '🍜',
        popular: true,
      },
      {
        id: 802,
        name: '加腐竹',
        nameEn: 'Add Bean Curd',
        price: 20,
        originalPrice: 28,
        unit: '碗',
        emoji: '🥢',
        popular: false,
      },
      {
        id: 803,
        name: '加卤蛋',
        nameEn: 'Add Braised Egg',
        price: 20,
        originalPrice: 28,
        unit: '碗',
        emoji: '🥚',
        popular: false,
      },
      {
        id: 804,
        name: '加猪脚',
        nameEn: 'Add Pork Trotters',
        price: 28,
        originalPrice: 38,
        unit: '碗',
        emoji: '🐷',
        popular: false,
      },
      {
        id: 805,
        name: '加鸭脚',
        nameEn: 'Add Duck Feet',
        price: 25,
        originalPrice: 35,
        unit: '碗',
        emoji: '🦆',
        popular: true,
      },
    ],
  },
  {
    id: 9,
    name: '螺蛳粉礼盒装',
    nameEn: 'Luosifen Gift Box',
    price: 68,
    originalPrice: 88,
    unit: '盒',
    imageUrl: 'https://i.imgur.com/LgCdOmj.jpeg',
    seller: '柳州螺蛳粉集团',
    rating: 4.8,
    reviewCount: 567,
    description: '送礼佳品，全国配送',
    descriptionEn: 'Perfect gift, nationwide shipping',
    variants: [
      {
        id: 901,
        name: '3包装',
        nameEn: '3 Pack',
        price: 48,
        originalPrice: 68,
        unit: '盒',
        emoji: '📦',
        popular: false,
      },
      {
        id: 902,
        name: '5包装',
        nameEn: '5 Pack',
        price: 68,
        originalPrice: 98,
        unit: '盒',
        emoji: '📦',
        popular: true,
      },
      {
        id: 903,
        name: '10包装',
        nameEn: '10 Pack',
        price: 128,
        originalPrice: 188,
        unit: '盒',
        emoji: '📦',
        popular: false,
      },
    ],
  },
  {
    id: 10,
    name: '螺蛳粉家庭装',
    nameEn: 'Family Pack',
    price: 128,
    originalPrice: 168,
    unit: '5包装',
    imageUrl: 'https://i.imgur.com/vy5fy6a.jpeg',
    seller: '柳州螺蛳粉集团',
    rating: 4.7,
    reviewCount: 234,
    description: '家庭囤货装，超值优惠',
    descriptionEn: 'Family bulk pack, great value',
    variants: [
      {
        id: 1001,
        name: '5包装',
        nameEn: '5 Pack',
        price: 128,
        originalPrice: 168,
        unit: '袋',
        emoji: '📦',
        popular: true,
      },
      {
        id: 1002,
        name: '10包装',
        nameEn: '10 Pack',
        price: 228,
        originalPrice: 298,
        unit: '袋',
        emoji: '📦',
        popular: false,
      },
    ],
  },
  {
    id: 11,
    name: '干捞螺蛳粉',
    nameEn: 'Dry Luosifen',
    price: 20,
    originalPrice: 28,
    unit: '碗',
    imageUrl: 'https://i.imgur.com/9Cctket.jpeg',
    seller: '青云螺蛳粉总店',
    rating: 4.8,
    reviewCount: 345,
    description: '干捞做法，味道更浓郁',
    descriptionEn: 'Dry style, more intense flavor',
    variants: [
      {
        id: 1101,
        name: '标准版',
        nameEn: 'Standard',
        price: 20,
        originalPrice: 28,
        unit: '碗',
        emoji: '🍝',
        popular: true,
      },
      {
        id: 1102,
        name: '加叉烧',
        nameEn: 'Add BBQ Pork',
        price: 26,
        originalPrice: 36,
        unit: '碗',
        emoji: '🥩',
        popular: false,
      },
      {
        id: 1103,
        name: '加牛肉',
        nameEn: 'Add Beef',
        price: 28,
        originalPrice: 38,
        unit: '碗',
        emoji: '🥩',
        popular: false,
      },
    ],
  },
  {
    id: 12,
    name: '螺蛳鸭脚煲',
    nameEn: 'Duck Feet Pot',
    price: 48,
    originalPrice: 68,
    unit: '煲',
    imageUrl: 'https://i.imgur.com/qUiwHmH.jpeg',
    seller: '青云特色煲',
    rating: 4.9,
    reviewCount: 567,
    description: '螺蛳汤底，鸭脚软糯',
    descriptionEn: 'Luosifen broth, tender duck feet',
    variants: [
      {
        id: 1201,
        name: '小煲 (2人)',
        nameEn: 'Small (2 ppl)',
        price: 48,
        originalPrice: 68,
        unit: '煲',
        emoji: '🍲',
        popular: true,
      },
      {
        id: 1202,
        name: '中煲 (3-4人)',
        nameEn: 'Medium (3-4 ppl)',
        price: 78,
        originalPrice: 108,
        unit: '煲',
        emoji: '🍲',
        popular: false,
      },
      {
        id: 1203,
        name: '大煲 (5-6人)',
        nameEn: 'Large (5-6 ppl)',
        price: 108,
        originalPrice: 148,
        unit: '煲',
        emoji: '🍲',
        popular: false,
      },
    ],
  },
  {
    id: 13,
    name: '柳州特产礼盒',
    nameEn: 'Liuzhou Gift Box',
    price: 168,
    originalPrice: 228,
    unit: '盒',
    imageUrl: 'https://i.imgur.com/ystBRo2.jpeg',
    seller: '青云手信',
    rating: 4.9,
    reviewCount: 345,
    description: '螺蛳粉+云片糕+罗汉果茶',
    descriptionEn: 'Luosifen + Cloud Cake + Tea combo',
    variants: [
      {
        id: 1301,
        name: '经济装',
        nameEn: 'Economy Pack',
        price: 88,
        originalPrice: 128,
        unit: '盒',
        emoji: '📦',
        popular: false,
      },
      {
        id: 1302,
        name: '标准装',
        nameEn: 'Standard Pack',
        price: 128,
        originalPrice: 188,
        unit: '盒',
        emoji: '🎁',
        popular: true,
      },
      {
        id: 1303,
        name: '豪华装',
        nameEn: 'Deluxe Pack',
        price: 198,
        originalPrice: 288,
        unit: '盒',
        emoji: '🎁',
        popular: false,
      },
    ],
  },
  {
    id: 14,
    name: '青云夜市礼包',
    nameEn: 'Night Market Pack',
    price: 98,
    originalPrice: 128,
    unit: '袋',
    imageUrl: 'https://i.imgur.com/hV5LDeK.jpeg',
    seller: '青云手信',
    rating: 4.6,
    reviewCount: 123,
    description: '夜市小吃精选组合',
    descriptionEn: 'Night market snack selection',
    variants: [
      {
        id: 1401,
        name: '小食拼盘',
        nameEn: 'Snack Platter',
        price: 48,
        originalPrice: 68,
        unit: '盒',
        emoji: '🥡',
        popular: false,
      },
      {
        id: 1402,
        name: '标准礼包',
        nameEn: 'Standard Pack',
        price: 88,
        originalPrice: 128,
        unit: '袋',
        emoji: '🎁',
        popular: true,
      },
      {
        id: 1403,
        name: '豪华礼包',
        nameEn: 'Deluxe Pack',
        price: 138,
        originalPrice: 198,
        unit: '袋',
        emoji: '🎁',
        popular: false,
      },
    ],
  },
  {
    id: 15,
    name: '柳州云片糕礼盒',
    nameEn: 'Cloud Cake Box',
    price: 58,
    originalPrice: 78,
    unit: '盒',
    imageUrl: 'https://i.imgur.com/vbpRKWz.jpeg',
    seller: '柳州老字号',
    rating: 4.5,
    reviewCount: 89,
    description: '传统云片糕，绵软香甜',
    descriptionEn: 'Traditional cloud cake, soft and sweet',
    variants: [
      {
        id: 1501,
        name: '原味',
        nameEn: 'Original',
        price: 28,
        originalPrice: 38,
        unit: '盒',
        emoji: '🍰',
        popular: true,
      },
      {
        id: 1502,
        name: '芝麻味',
        nameEn: 'Sesame',
        price: 30,
        originalPrice: 42,
        unit: '盒',
        emoji: '🍰',
        popular: false,
      },
      {
        id: 1503,
        name: '花生味',
        nameEn: 'Peanut',
        price: 30,
        originalPrice: 42,
        unit: '盒',
        emoji: '🍰',
        popular: false,
      },
    ],
  },
  {
    id: 16,
    name: '螺蛳粉超大礼包',
    nameEn: 'Super Gift Pack',
    price: 258,
    originalPrice: 328,
    unit: '盒',
    imageUrl: 'https://i.imgur.com/vbpRKWz.jpeg',
    seller: '柳州特产商城',
    rating: 4.9,
    reviewCount: 678,
    description: '10包装螺蛳粉+特产组合',
    descriptionEn: '10-pack Luosifen + specialty combo',
    variants: [
      {
        id: 1601,
        name: '10包装',
        nameEn: '10 Pack',
        price: 168,
        originalPrice: 238,
        unit: '盒',
        emoji: '📦',
        popular: true,
      },
      {
        id: 1602,
        name: '15包装',
        nameEn: '15 Pack',
        price: 238,
        originalPrice: 338,
        unit: '盒',
        emoji: '📦',
        popular: false,
      },
      {
        id: 1603,
        name: '20包装',
        nameEn: '20 Pack',
        price: 328,
        originalPrice: 468,
        unit: '盒',
        emoji: '📦',
        popular: false,
      },
    ],
  },
  {
    id: 17,
    name: '甘蔗汁',
    nameEn: 'Sugarcane Juice',
    price: 8,
    originalPrice: 12,
    unit: '杯',
    imageUrl: 'https://i.imgur.com/o2CSk8s.jpeg',
    seller: '青云饮品店',
    rating: 4.5,
    reviewCount: 89,
    description: '鲜榨甘蔗汁，清甜解渴',
    descriptionEn: 'Fresh sugarcane juice, sweet and refreshing',
    variants: [
      {
        id: 1701,
        name: '小杯',
        nameEn: 'Small',
        price: 6,
        originalPrice: 9,
        unit: '杯',
        emoji: '🥤',
        popular: false,
      },
      {
        id: 1702,
        name: '中杯',
        nameEn: 'Medium',
        price: 8,
        originalPrice: 12,
        unit: '杯',
        emoji: '🥤',
        popular: true,
      },
      {
        id: 1703,
        name: '大杯',
        nameEn: 'Large',
        price: 10,
        originalPrice: 15,
        unit: '杯',
        emoji: '🥤',
        popular: false,
      },
      {
        id: 1704,
        name: '加柠檬',
        nameEn: 'Add Lemon',
        price: 12,
        originalPrice: 18,
        unit: '杯',
        emoji: '🍋',
        popular: false,
      },
    ],
  },
  {
    id: 18,
    name: '罗汉果茶',
    nameEn: 'Luohanguo Tea',
    price: 12,
    originalPrice: 18,
    unit: '瓶',
    imageUrl: 'https://i.imgur.com/ybIPQXm.jpeg',
    seller: '广西特产',
    rating: 4.7,
    reviewCount: 67,
    description: '润肺止咳，广西特产',
    descriptionEn: 'Moistens lungs, Guangxi specialty',
    variants: [
      {
        id: 1801,
        name: '瓶装',
        nameEn: 'Bottled',
        price: 12,
        originalPrice: 18,
        unit: '瓶',
        emoji: '🍾',
        popular: true,
      },
      {
        id: 1802,
        name: '礼盒装',
        nameEn: 'Gift Box',
        price: 48,
        originalPrice: 68,
        unit: '盒',
        emoji: '🎁',
        popular: false,
      },
    ],
  },
  {
    id: 19,
    name: '酸梅汤',
    nameEn: 'Sour Plum Drink',
    price: 6,
    originalPrice: 10,
    unit: '杯',
    imageUrl: 'https://i.imgur.com/g6S8Yi6.jpeg',
    seller: '青云饮品店',
    rating: 4.6,
    reviewCount: 123,
    description: '自制酸梅汤，解腻开胃',
    descriptionEn: 'Homemade sour plum drink, appetite stimulating',
    variants: [
      {
        id: 1901,
        name: '小杯',
        nameEn: 'Small',
        price: 5,
        originalPrice: 8,
        unit: '杯',
        emoji: '🥤',
        popular: false,
      },
      {
        id: 1902,
        name: '中杯',
        nameEn: 'Medium',
        price: 7,
        originalPrice: 10,
        unit: '杯',
        emoji: '🥤',
        popular: true,
      },
      {
        id: 1903,
        name: '大杯',
        nameEn: 'Large',
        price: 9,
        originalPrice: 13,
        unit: '杯',
        emoji: '🥤',
        popular: false,
      },
    ],
  },
  {
    id: 20,
    name: '玉米汁',
    nameEn: 'Corn Juice',
    price: 10,
    originalPrice: 15,
    unit: '杯',
    imageUrl: 'https://i.imgur.com/p4wEX3v.jpeg',
    seller: '青云饮品店',
    rating: 4.4,
    reviewCount: 56,
    description: '鲜榨玉米汁，香浓顺滑',
    descriptionEn: 'Fresh corn juice, creamy and smooth',
    variants: [
      {
        id: 2001,
        name: '小杯',
        nameEn: 'Small',
        price: 8,
        originalPrice: 12,
        unit: '杯',
        emoji: '🥤',
        popular: false,
      },
      {
        id: 2002,
        name: '中杯',
        nameEn: 'Medium',
        price: 10,
        originalPrice: 15,
        unit: '杯',
        emoji: '🥤',
        popular: true,
      },
      {
        id: 2003,
        name: '大杯',
        nameEn: 'Large',
        price: 12,
        originalPrice: 18,
        unit: '杯',
        emoji: '🥤',
        popular: false,
      },
    ],
  },
  {
    id: 21,
    name: '茅根竹蔗水',
    nameEn: 'Herbal Drink',
    price: 10,
    originalPrice: 15,
    unit: '杯',
    imageUrl: 'https://i.imgur.com/1MbXg4U.jpeg',
    seller: '青云凉茶铺',
    rating: 4.7,
    reviewCount: 234,
    description: '清热解渴，传统凉茶',
    descriptionEn: 'Cools and quenches thirst, traditional herbal tea',
    variants: [
      {
        id: 2101,
        name: '瓶装',
        nameEn: 'Bottled',
        price: 10,
        originalPrice: 15,
        unit: '瓶',
        emoji: '🍾',
        popular: true,
      },
      {
        id: 2102,
        name: '壶装',
        nameEn: 'Kettle',
        price: 25,
        originalPrice: 35,
        unit: '壶',
        emoji: '🫖',
        popular: false,
      },
    ],
  },
  {
    id: 22,
    name: '麻辣烫套餐',
    nameEn: 'Mala Tang Set',
    price: 35,
    originalPrice: 48,
    unit: '份',
    imageUrl: 'https://i.imgur.com/VljUFVz.jpeg',
    seller: '青云麻辣烫',
    rating: 4.6,
    reviewCount: 234,
    description: '自选麻辣烫，送米饭',
    descriptionEn: 'Choose your own Mala Tang, rice included',
    variants: [
      {
        id: 2201,
        name: '素食套餐',
        nameEn: 'Vegan Set',
        price: 25,
        originalPrice: 35,
        unit: '份',
        emoji: '🥬',
        popular: false,
      },
      {
        id: 2202,
        name: '肉类套餐',
        nameEn: 'Meat Set',
        price: 35,
        originalPrice: 48,
        unit: '份',
        emoji: '🥩',
        popular: true,
      },
      {
        id: 2203,
        name: '海鲜套餐',
        nameEn: 'Seafood Set',
        price: 45,
        originalPrice: 65,
        unit: '份',
        emoji: '🦐',
        popular: false,
      },
    ],
  },
  {
    id: 23,
    name: '炒饭便当',
    nameEn: 'Fried Rice Bento',
    price: 22,
    originalPrice: 28,
    unit: '份',
    imageUrl: 'https://i.imgur.com/RIMIksQ.jpeg',
    seller: '青云快餐',
    rating: 4.4,
    reviewCount: 156,
    description: '特色炒饭+小菜+例汤',
    descriptionEn: 'Special fried rice + sides + soup',
    variants: [
      {
        id: 2301,
        name: '蛋炒饭',
        nameEn: 'Egg Fried Rice',
        price: 18,
        originalPrice: 25,
        unit: '份',
        emoji: '🍚',
        popular: false,
      },
      {
        id: 2302,
        name: '扬州炒饭',
        nameEn: 'Yangzhou Fried Rice',
        price: 22,
        originalPrice: 30,
        unit: '份',
        emoji: '🍚',
        popular: true,
      },
      {
        id: 2303,
        name: '腊味炒饭',
        nameEn: 'Cured Meat Fried Rice',
        price: 25,
        originalPrice: 35,
        unit: '份',
        emoji: '🍚',
        popular: false,
      },
    ],
  },
  {
    id: 24,
    name: '黄焖鸡米饭',
    nameEn: 'Braised Chicken',
    price: 28,
    originalPrice: 38,
    unit: '份',
    imageUrl: 'https://i.imgur.com/Z2WcKxF.jpeg',
    seller: '青云黄焖鸡',
    rating: 4.7,
    reviewCount: 234,
    description: '秘制黄焖鸡，配米饭',
    descriptionEn: 'Secret recipe braised chicken, with rice',
    variants: [
      {
        id: 2401,
        name: '标准份',
        nameEn: 'Standard',
        price: 28,
        originalPrice: 38,
        unit: '份',
        emoji: '🍗',
        popular: true,
      },
      {
        id: 2402,
        name: '大份',
        nameEn: 'Large',
        price: 38,
        originalPrice: 52,
        unit: '份',
        emoji: '🍗',
        popular: false,
      },
      {
        id: 2403,
        name: '加香菇',
        nameEn: 'Add Mushrooms',
        price: 32,
        originalPrice: 44,
        unit: '份',
        emoji: '🍄',
        popular: false,
      },
    ],
  },
  {
    id: 25,
    name: '牛腩饭',
    nameEn: 'Beef Brisket Rice',
    price: 32,
    originalPrice: 42,
    unit: '份',
    imageUrl: 'https://i.imgur.com/QzSj9cI.jpeg',
    seller: '青云牛腩饭',
    rating: 4.8,
    reviewCount: 189,
    description: '慢炖牛腩，软烂入味',
    descriptionEn: 'Slow-braised beef brisket, tender and flavorful',
    variants: [
      {
        id: 2501,
        name: '标准份',
        nameEn: 'Standard',
        price: 32,
        originalPrice: 42,
        unit: '份',
        emoji: '🥩',
        popular: true,
      },
      {
        id: 2502,
        name: '大份',
        nameEn: 'Large',
        price: 42,
        originalPrice: 58,
        unit: '份',
        emoji: '🥩',
        popular: false,
      },
    ],
  },
  {
    id: 26,
    name: '叉烧饭',
    nameEn: 'BBQ Pork Rice',
    price: 26,
    originalPrice: 35,
    unit: '份',
    imageUrl: 'https://i.imgur.com/BocC3SG.jpeg',
    seller: '青云烧腊',
    rating: 4.6,
    reviewCount: 145,
    description: '蜜汁叉烧，配例汤',
    descriptionEn: 'Honey BBQ pork, with soup',
    variants: [
      {
        id: 2601,
        name: '标准份',
        nameEn: 'Standard',
        price: 26,
        originalPrice: 35,
        unit: '份',
        emoji: '🍖',
        popular: true,
      },
      {
        id: 2602,
        name: '大份',
        nameEn: 'Large',
        price: 36,
        originalPrice: 50,
        unit: '份',
        emoji: '🍖',
        popular: false,
      },
      {
        id: 2603,
        name: '双拼',
        nameEn: 'Double Combo',
        price: 38,
        originalPrice: 52,
        unit: '份',
        emoji: '🍖',
        popular: false,
      },
    ],
  },
];

function FoodDetailPage() {
  const { user, login, register, logout } = useAuth();
  const params = useParams();
  const productId = parseInt(params.id);
  const [language, setLanguage] = useState('中文');
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('ordering');
  const [orderNumber, setOrderNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('local');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [wechatConfirm, setWechatConfirm] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const product = foodProducts.find((p) => p.id === productId);

  useEffect(() => {
    if (
      product &&
      product.variants &&
      product.variants.length > 0 &&
      !selectedVariant
    ) {
      setSelectedVariant(product.variants[0]);
    }
    const savedCart = localStorage.getItem('food_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {}
    }
    if (user) {
      setCustomerName(user.name || '');
      setCustomerPhone(user.phone || '');
    }
    const savedItems = JSON.parse(localStorage.getItem('saved_items') || '[]');
    setIsSaved(savedItems.some((item) => item.id === productId));
  }, [product, user]);

  useEffect(() => {
    localStorage.setItem('food_cart', JSON.stringify(cart));
  }, [cart]);

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Product not found
          </h1>
          <Link href="/food" className="text-blue-600 mt-4 inline-block">
            ← Back to Food
          </Link>
        </div>
      </main>
    );
  }

  const showNotification = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const toggleLanguage = () => {
    setLanguage(language === '中文' ? 'EN' : '中文');
  };

  const handleSave = () => {
    if (!user) {
      showNotification('请先登录');
      setShowLoginModal(true);
      return;
    }
    const savedItems = JSON.parse(localStorage.getItem('saved_items') || '[]');
    const exists = savedItems.find((item) => item.id === productId);
    if (exists) {
      const newSaved = savedItems.filter((item) => item.id !== productId);
      localStorage.setItem('saved_items', JSON.stringify(newSaved));
      setIsSaved(false);
      showNotification('已取消收藏');
    } else {
      savedItems.push({
        id: productId,
        name: product.name,
        price: product.price,
        type: 'food',
        image: product.imageUrl,
      });
      localStorage.setItem('saved_items', JSON.stringify(savedItems));
      setIsSaved(true);
      showNotification('收藏成功');
    }
  };

  const addToCart = () => {
    if (!user) {
      showNotification('请先登录');
      setShowLoginModal(true);
      return;
    }
    if (!selectedVariant) {
      showNotification('请选择规格');
      return;
    }
    const cartItem = {
      id: `${product.id}_${selectedVariant.id}`,
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      variantName: selectedVariant.name,
      price: selectedVariant.price,
      quantity: quantity,
      image: product.imageUrl,
    };
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === cartItem.id);
      if (existing) {
        const newCart = prevCart.map((item) =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        showNotification(
          `已添加 ${quantity} 份 ${product.name} (${selectedVariant.name})`
        );
        return newCart;
      }
      showNotification(
        `已添加 ${quantity} 份 ${product.name} (${selectedVariant.name})`
      );
      return [...prevCart, cartItem];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + delta;
            if (newQuantity <= 0) return null;
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    showNotification('已删除');
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const serviceFee = cartTotal > 0 ? (deliveryMethod === 'local' ? 3 : 8) : 0;
  const grandTotal = cartTotal + serviceFee;

  const handleCheckout = () => {
    if (cart.length === 0) {
      showNotification('请先添加商品');
      return;
    }
    setCheckoutStep('checkout');
  };

  const sendWeChatConfirmation = (order) => {
    setWechatConfirm({
      title: '订单已接收',
      message: `您已成功下单 ${order.items.length} 件商品，总计 ¥${order.total}`,
      orderNumber: order.orderNumber,
      eta: deliveryMethod === 'local' ? '预计30-60分钟送达' : '预计2-5天送达',
    });
    setTimeout(() => setWechatConfirm(null), 5000);
  };

  const submitOrder = () => {
    if (!customerName || !customerPhone || !deliveryAddress) {
      showNotification('请填写完整信息');
      return;
    }
    const newOrderNumber = `LZ${Date.now()}`;
    setOrderNumber(newOrderNumber);
    const order = {
      orderNumber: newOrderNumber,
      items: cart,
      total: grandTotal,
      customer: {
        name: customerName,
        phone: customerPhone,
        address: deliveryAddress,
        wechatId: user?.phone,
      },
      deliveryMethod,
      date: new Date().toISOString(),
      status: 'preparing',
    };
    const orders = JSON.parse(localStorage.getItem('food_orders') || '[]');
    orders.unshift(order);
    localStorage.setItem('food_orders', JSON.stringify(orders));
    localStorage.removeItem('food_cart');
    setCart([]);
    sendWeChatConfirmation(order);
    setCheckoutStep('confirmation');
  };

  const continueShopping = () => {
    setCheckoutStep('ordering');
    setCustomerName(user?.name || '');
    setCustomerPhone(user?.phone || '');
    setDeliveryAddress('');
    setDeliveryMethod('local');
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    showNotification('已退出登录');
  };

  const t = (zh, en) => (language === '中文' ? zh : en);

  if (checkoutStep === 'confirmation') {
    return (
      <main className="min-h-screen bg-gray-100">
        <div className="max-w-md mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-2xl font-bold text-green-600 mb-2">
              {t('订单已确认', 'Order Confirmed')}
            </h1>
            <p className="text-gray-600 mb-4">
              {t('订单号', 'Order Number')}:{' '}
              <strong className="text-blue-600">{orderNumber}</strong>
            </p>
            <div className="bg-green-50 rounded-lg p-3 mb-4 text-sm text-green-700">
              📱 {t('微信通知已发送', 'WeChat notification sent')}
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left max-h-60 overflow-y-auto">
              <h3 className="font-medium mb-2">
                {t('订单详情', 'Order Details')}
              </h3>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm py-1"
                >
                  <span>
                    {item.name} ({item.variantName}) x {item.quantity}
                  </span>
                  <span>¥{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t mt-2 pt-2 font-bold flex justify-between">
                <span>{t('合计', 'Total')}:</span>
                <span>¥{grandTotal}</span>
              </div>
            </div>
            <Link
              href="/food"
              onClick={continueShopping}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              {t('继续购物', 'Continue Shopping')}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 pb-24">
      {wechatConfirm && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-80 bg-white rounded-xl shadow-2xl overflow-hidden animate-fade-in-out">
          <div className="bg-green-500 text-white px-4 py-2 flex items-center gap-2">
            <span className="text-lg">💚</span>
            <span className="font-medium">微信服务通知</span>
          </div>
          <div className="p-4">
            <p className="font-bold text-gray-800">{wechatConfirm.title}</p>
            <p className="text-sm text-gray-600 mt-1">
              {wechatConfirm.message}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              订单号: {wechatConfirm.orderNumber}
            </p>
            <p className="text-xs text-green-600 mt-1">{wechatConfirm.eta}</p>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white px-4 py-2 rounded-full text-sm shadow-lg animate-fade-in-out">
          {toastMessage}
        </div>
      )}

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={login}
        onRegister={register}
        language={language}
      />

      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex gap-3 md:gap-4 items-center">
              <button onClick={toggleLanguage} className="text-xl">
                🌐{' '}
                <span className="text-xs ml-1 hidden md:inline">
                  {language}
                </span>
              </button>
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 transition"
                  >
                    <span className="text-lg">👤</span>
                    <span className="text-sm font-medium hidden md:inline">
                      {user.name?.split(' ')[0] || user.name}
                    </span>
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                      <div className="px-4 py-3 border-b">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        📋 {t('我的订单', 'My Orders')}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        🚪 {t('退出登录', 'Logout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-sm text-blue-600 flex items-center gap-1"
                >
                  <span>👤</span> {t('登录/注册', 'Login')}
                </button>
              )}
              <Link
                href="/orders"
                className="text-xl hover:text-blue-600 hidden md:inline"
              >
                📋
              </Link>
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative text-2xl"
              >
                🛒
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Product Detail */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link href="/food" className="text-blue-600 mb-4 inline-block">
          ← {t('返回美食列表', 'Back to Food')}
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-80 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6">
              <h1 className="text-2xl font-bold">
                {language === '中文' ? product.name : product.nameEn}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-500">⭐</span>
                <span>{product.rating}</span>
                <span className="text-gray-400">
                  ({product.reviewCount} {t('条评价', 'reviews')})
                </span>
              </div>
              <p className="text-gray-600 mt-4">
                {language === '中文'
                  ? product.description
                  : product.descriptionEn}
              </p>
              <p className="text-sm text-gray-500 mt-2">🏪 {product.seller}</p>

              {/* Variants */}
              <div className="mt-6">
                <h3 className="font-medium mb-3">
                  {t('选择规格', 'Select Options')}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 rounded-full border transition ${
                        selectedVariant?.id === variant.id
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      <span className="mr-1">{variant.emoji}</span>
                      {language === '中文' ? variant.name : variant.nameEn}
                      {variant.popular && (
                        <span className="ml-1 text-xs text-red-500">🔥</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              {selectedVariant && (
                <div className="mt-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-blue-600">
                      ¥{selectedVariant.price}
                    </span>
                    <span className="text-gray-400 line-through">
                      ¥{selectedVariant.originalPrice}
                    </span>
                    <span className="text-gray-500">
                      /{selectedVariant.unit}
                    </span>
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-6">
                <h3 className="font-medium mb-3">{t('数量', 'Quantity')}</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-gray-100 text-xl"
                  >
                    -
                  </button>
                  <span className="text-xl w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-gray-100 text-xl"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className={`w-full mt-3 py-3 rounded-xl font-semibold transition border ${
                  isSaved
                    ? 'bg-yellow-50 border-yellow-400 text-yellow-600'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {isSaved ? '⭐ 已收藏' : '☆ 收藏'}
              </button>

              {/* Add to Cart Button */}
              <button
                onClick={addToCart}
                className="w-full mt-3 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                🛒 {t('加入购物车', 'Add to Cart')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed right-4 top-24 w-80 bg-white rounded-xl shadow-lg p-4 z-50 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">{t('购物车', 'Cart')}</h2>
            <button
              onClick={() => setShowCart(false)}
              className="text-gray-400"
            >
              ✕
            </button>
          </div>
          {cart.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              {t('购物车是空的', 'Cart is empty')}
            </p>
          ) : (
            <>
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start border-b pb-2"
                  >
                    <div>
                      <p className="font-medium text-sm">
                        {item.name} ({item.variantName})
                      </p>
                      <p className="text-xs text-gray-400">
                        ¥{item.price} × {item.quantity}
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 text-xs"
                      >
                        {t('删除', 'Del')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-3">
                <div className="flex justify-between font-bold">
                  <span>{t('合计', 'Total')}:</span>
                  <span className="text-blue-600">¥{cartTotal}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold mt-4"
                >
                  {t('去结算', 'Checkout')} →
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {!showCart && cart.length > 0 && (
        <div className="fixed bottom-20 right-4 z-40">
          <button
            onClick={() => setShowCart(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg text-sm"
          >
            🛒 {t('购物车', 'Cart')} (
            {cart.reduce((sum, item) => sum + item.quantity, 0)})
          </button>
        </div>
      )}

      {/* Checkout Modal */}
      {checkoutStep === 'checkout' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{t('订单结算', 'Checkout')}</h2>
              <button
                onClick={() => setCheckoutStep('ordering')}
                className="text-gray-400 text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('姓名', 'Name')}
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('电话', 'Phone')}
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('配送地址', 'Address')}
                </label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('配送方式', 'Delivery')}
                </label>
                <select
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option value="local">{t('本地配送', 'Local')}</option>
                  <option value="shipping">{t('快递配送', 'Shipping')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('支付方式', 'Payment')}
                </label>
                <div className="border rounded-lg p-3 bg-gray-50">
                  <span>💚</span> {t('微信支付 (模拟)', 'WeChat Pay')}
                </div>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>{t('订单总额', 'Total')}:</span>
                  <span className="text-blue-600">¥{grandTotal}</span>
                </div>
              </div>
              <button
                onClick={submitOrder}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold"
              >
                💚 {t('微信支付', 'WeChat Pay')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Chatbot */}
      <AIChatbot language={language} />

      {/* Bottom Navigation */}
      <BottomNav language={language} />
    </main>
  );
}

export default function FoodDetailWrapper() {
  return (
    <AuthProvider>
      <FoodDetailPage />
    </AuthProvider>
  );
}
