import { NextPage } from 'next';

import Layout from 'components/layouts/Layout';

const Dashboard: NextPage = () => {
  return (
    <Layout>
      <Layout.NavigationBar />
      <Layout.Body>
        <h1>Dashboard</h1>
      </Layout.Body>
    </Layout>
  );
};

export default Dashboard;
