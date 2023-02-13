import Title from "@/components/Title";
import { Product } from "./api/products";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import Page from "@/components/Page";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/products");

      const products = await response.json();

      setProducts(products);
    })();
  }, []);

  return (
    <Page title="Indoor Plants">
      <main className="p-4">
        <Title title="Next Shop" />
        <ul className="grid grid-cols-1 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </main>
    </Page>
  );
}

export default HomePage;
