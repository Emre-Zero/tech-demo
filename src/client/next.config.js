module.exports = {
  compiler: {
    reactRemoveProperties: true,
    removeConsole: {
      exclude: ['error'],
    },
  },
  swcMinify: true,
  distDir: '../../.next',
  env: {
    NEXT_PUBLIC_STRIPE_KEY: process.env.NEXT_PUBLIC_STRIPE_KEY,
  },
};
