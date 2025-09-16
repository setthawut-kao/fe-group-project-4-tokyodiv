import { ProductCard } from "@/components/features/products/ProductCard";
import { Typography } from "@/components/ui/typography";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const ProductGrid = ({ products = [] }) => {
  if (products.length === 0) {
    return <Typography as="p">No products found in this category</Typography>;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10"
    >
      {products.map((product) => (
        <motion.div
          key={product._id}
          variants={itemVariants}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
};
