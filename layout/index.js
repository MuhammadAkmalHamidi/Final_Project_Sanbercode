import Sidebar from "@/components/sidebar";
import Trends from "@/components/trends";
import { Box, Button, Flex } from "@chakra-ui/react";
import Head from "next/head";

export default function Layout({ children, MetaDesc, metaKeyword, metaTitle }) {
  return (
    <div>
      <Head>
        <title>Sanber Daily - {metaTitle || "Let's explore the world"}</title>
        <meta name="description" content={MetaDesc || "Social Media Web"} />
        <meta name="keyword" content={metaKeyword} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex>
        <Sidebar />
        {children}
        <Trends />
      </Flex>
    </div>
  );
}
