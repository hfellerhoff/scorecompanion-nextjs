import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

interface Props {}

const index = (props: Props) => {
  return (
    <Layout>
      <Head>
        <title>Score Companion – Find your next piece.</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </Layout>
  );
};

export default index;
