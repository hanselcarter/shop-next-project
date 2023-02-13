import Head from "next/head";
import Title from "@/components/Title";

interface PageProps {
  children?: JSX.Element;
  title: string;
}

export const Page = ({ title, children }: PageProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-4">
        <Title title={title} />
        {children}
      </main>
    </>
  );
};

export default Page;
