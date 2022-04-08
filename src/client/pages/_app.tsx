import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import store from '@client/app/store';
import '@client/styles.css';

function MyApp(props: { Component: any; pageProps: any }) {
  const { Component, pageProps } = props;
  return (
    <Provider store={store}>
      <Head>
        <title>Stripe Demo</title>
      </Head>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component { ...pageProps } />
    </Provider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
