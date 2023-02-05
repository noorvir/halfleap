import { NextPage } from 'next';
import Link from 'next/link';

import Layout from 'components/layouts/Layout';

import NavBar from '../components/layouts/NavBar';
import { Heading } from '../components/ui/Typography';

const Dashboard: NextPage = () => {
  return (
    <Layout>
      <Layout.MenuBar />
      <Layout.Body>
        <div className={'flex flex-row'}>
          <NavBar />
          <div className={'w-1/2 bg-amber-50'}>
            <h1>Dashboard</h1>
          </div>
          <div className={'w-1/3 bg-green-100'}>sidepanel</div>
        </div>
      </Layout.Body>
    </Layout>
  );
};

export default Dashboard;
