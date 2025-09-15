import { faker } from "@faker-js/faker";

// 1. ใช้หมวดหมู่ให้ตรงกับที่ใช้ใน MainProduct.jsx
export const CATEGORIES = [
  "Living Room",
  "Bedroom",
  "Dining & Kitchen",
  "Decor & Lighting",
];

const generatedProducts = [];

// 2. สร้างสินค้าทั้งหมด 48 ชิ้น (12 ชิ้นต่อหมวดหมู่)
CATEGORIES.forEach((category) => {
  for (let i = 0; i < 12; i++) {
    generatedProducts.push({
      _id: faker.database.mongodbObjectId(), // 👈 3. เปลี่ยนจาก id เป็น _id และใช้ ObjectId ของปลอม
      category: category,
      name: faker.commerce.productName(),
      price: parseFloat(
        faker.commerce.price({ min: 1000, max: 20000, dec: 0 })
      ), // ไม่เอาทศนิยม
      imageUrl: `https://picsum.photos/seed/${faker.string.uuid()}/400/300`, // ใช้รูปสุ่มเพื่อให้เห็นความแตกต่าง
      description: faker.commerce.productDescription(),
      status: "available",
    });
  }
});

// 4. Export แค่ตัวแปรเดียว ด้วยชื่อตัวพิมพ์เล็ก (camelCase) ตาม Convention
export const mockProducts = generatedProducts;
