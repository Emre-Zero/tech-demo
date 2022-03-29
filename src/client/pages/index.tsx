import React from 'react';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import Checkout from '@client/pages/checkout';

const theme = createTheme({
  type: 'light',
  theme: {
    colors: {
      // brand colors
      primaryLight: '$purple400',
      primary: '$purple500',
      secondary: '$gray200',
      primaryDark: '$gray900',
      gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#5E1DAD',
    },
    space: {},
    fonts: {},
  },
});

function Home() {
  return (
    <NextUIProvider theme={theme}>
      <Checkout />
    </NextUIProvider>
  );
}

export default Home;
