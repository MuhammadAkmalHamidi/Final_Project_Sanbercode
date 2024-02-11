import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/layout'
import { Box, Flex } from '@chakra-ui/react'
import FormCreateContent from '@/components/content/form-create-content'
import AllContent from '@/components/content/all-content'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Layout metaTitle={"Home"}>

        <Box ml={"5%"} pl={"20%"} pr={"30%"} w={"100%"}>
          <FormCreateContent />
          <AllContent />
        </Box>
      </Layout>
    </>
  )
}
