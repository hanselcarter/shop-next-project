import { getProducts, getProduct } from "@/lib/products";
import {
  GetStaticPathsResult,
  GetStaticPropsResult,
  GetStaticPropsContext,
} from "next";
import { useEffect, useState } from "react";
import { Product } from "../api/products";
import { useRouter } from "next/router";

interface ProductPageProps {
  productId: string;
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const products = await getProducts();

  return {
    paths: products.map((product) => ({
      params: {
        id: product.id.toString(),
      },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<ProductPageProps>> {
  const productId = context?.params?.id ? (context.params.id as string) : "1";

  return { props: { productId } };
}

const ProductPage = ({ productId }: ProductPageProps): JSX.Element => {
  const router = useRouter();

  const [product, setProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/product/${productId}`);

        const product = await response.json();

        setProduct(product);
      } catch (err) {
        console.log(err, "err");

        router.push("/not-found");
      }
    })();
  }, [productId, router]);

  if (product === undefined) {
    return <>...Loading</>;
  }

  return (
    <>
      <h1>{product?.title}</h1>
      <p>{product?.description}</p>
    </>
  );
};

export default ProductPage;
