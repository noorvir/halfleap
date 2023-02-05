import { NextPage } from 'next';

import Layout from '../components/layouts/Layout';
import NavBar from '../components/layouts/NavBar';
import supabase from '../lib/supabase';

const Events: NextPage = () => {
  // const channel = supabase
  //   .channel('table-db-changes')
  //   .on(
  //     'postgres_changes',
  //     {
  //       event: 'INSERT',
  //       schema: 'halfleap',
  //       table: 'events',
  //     },
  //     (payload) => console.log(payload)
  //   )
  //   .subscribe();

  supabase
    .from('events')
    .select('*')
    .then((res) => console.log(res));

  return (
    <Layout>
      <Layout.MenuBar />
      <Layout.Body>
        <div className={'flex flex-row'}>
          <NavBar />
          <div className={'w-1/2 bg-amber-50'}>
            <h1>Events</h1>
          </div>
          <div className={'w-1/3 bg-green-100'}>sidepanel</div>
        </div>
      </Layout.Body>
    </Layout>
  );
};

export default Events;
