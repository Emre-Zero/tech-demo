import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import Checkout from '@client/features/payment/Checkout';
import theme from '@client/app/nextui';

function Home() {
  return (
    <NextUIProvider theme={theme}>
      <Checkout />
    </NextUIProvider>
  );
}

export default Home;
