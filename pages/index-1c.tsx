//Option 1b: fetch products on the server side in get server side props
//but with incremental static regeneration

import Head from "next/head";
import Title from "@/components/Title";
import { getProducts } from "../lib/products";
import { GetServerSidePropsResult } from "next";
import { Product } from "./api/products";

interface HomePageProps {
  products: Product[];
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<HomePageProps>
> {
  const products = await getProducts();
  return { props: { products } };
}

function HomePage({ products }: HomePageProps) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-4">
        <Title title="Next Shop" />
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default HomePage;