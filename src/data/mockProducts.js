import { faker } from "@faker-js/faker";

// 1. กำหนดหมวดหมู่ที่เรามี
export const CATEGORIES = [
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Home Office",
  "Decorations",
];

const MOCK_PRODUCTS_LIST = [];
let currentId = 1;

// 2. วนลูปตามหมวดหมู่แต่ละอัน
CATEGORIES.forEach((category) => {
  // 3. ในแต่ละหมวดหมู่, สร้างสินค้า 12 ชิ้น
  for (let i = 0; i < 12; i++) {
    MOCK_PRODUCTS_LIST.push({
      id: currentId++,
      category: category,
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price({ min: 1000, max: 20000 })), // สร้างราคาเป็นตัวเลข
      imageUrl: "https://github.com/shadcn.png", // สร้าง URL รูปภาพสมจริง
      description: faker.commerce.productDescription(),
      status: "available",
    });
  }
});

export const MOCK_PRODUCTS = MOCK_PRODUCTS_LIST;

// 5. สร้างและ Export ข้อมูลสำหรับ "New Arrivals" โดยเฉพาะ (6 ชิ้นแรก)
export const MOCK_NEW_ARRIVALS = MOCK_PRODUCTS.slice(0, 6);

// 6. (ทางเลือก) สร้างข้อมูลสำหรับ "Featured Products" แบบสุ่ม 4 ชิ้น
const shuffled = [...MOCK_PRODUCTS].sort(() => 0.5 - Math.random());
export const MOCK_FEATURED_PRODUCTS = shuffled.slice(0, 6);
