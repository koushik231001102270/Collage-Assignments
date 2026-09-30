import React from "react";
import type { Product } from "../products";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  products: Product[];
  onAdd: (id: number) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, onAdd }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px", width: "100%" }}>
      {products.map((p, index) => (
        <ProductCard
          key={p.id}
          name={p.name}
          category={p.category}
          price={p.price}
          index={index}
          total={products.length}
          onAdd={() => onAdd(p.id)}
        />
      ))}
    </div>
  );
};
