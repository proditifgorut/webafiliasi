import { faker } from '@faker-js/faker';

const brands = ['Informa', 'ACE'];
const categories = ['Kursi', 'Meja', 'Lemari', 'Lampu', 'Perkakas', 'Dekorasi'];

export const generateMockProducts = (count = 10) => {
  return Array.from({ length: count }, (_, index) => {
    const brand = faker.helpers.arrayElement(brands);
    const category = faker.helpers.arrayElement(categories);
    const price = faker.number.int({ min: 50000, max: 5000000 });
    
    return {
      id: faker.string.uuid(),
      name: `${category} ${faker.commerce.productAdjective()} ${brand}`,
      brand,
      category,
      price,
      image: `https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/${brand === 'Informa' ? '3b82f6' : 'ef4444'}/ffffff?text=${category}`,
      createdAt: faker.date.recent({ days: 30 }).toISOString(),
      description: faker.commerce.productDescription(),
      affiliateLink: `https://${brand.toLowerCase()}.co.id/product/${faker.string.alphanumeric(8)}`
    };
  });
};
