import { Product } from "@/pages/api/products";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps): JSX.Element => {
  return (
    <div className="border my-4 w-80 shadow hover:shadow-xl">
      <Image src={`${product.picture.url}`} alt="" width={320} height={240} />

      <Link href={`/products/${product.id}`}>
        <div className="p-2 flex justify-between items-baseline">
          <h2 className="text-lg font-bold">{product.title}</h2>
          <span>${product.price}</span>
        </div>
      </Link>
    </div>
  );
};
