import React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Card, Divider, Grid, Link, Row, Text } from '@nextui-org/react';
import { Elements } from '@stripe/react-stripe-js';
import { useAppSelector } from '@client/app/hooks';
import { getPaymentInfo } from '@client/features/payment/paymentSlice';
import StripeForm from '@client/features/payment/StripeForm';
import Finished from '@client/features/payment/Finished';
import InitialForm from '@client/features/payment/InitialForm';
import getStripe from '@client/app/stripe.util';

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });

const Checkout: NextPage = () => {
  const paymentInfo = useAppSelector(getPaymentInfo);

  return (
    <Grid.Container gap={2} justify="center" css={{ my: '30px' }}>
      <Card css={{ mw: '400px' }}>
        <Card.Header>
          <Link href="/">
            <Text b h3 css={{ textGradient: '180deg, $purple300 50%, $purple500 -20%' }}>
              Stripe Demo
            </Text>
          </Link>
        </Card.Header>

        <Divider />

        <Card.Body css={{ pt: '$10' }}>
          {paymentInfo.status === 'billing-info' && <InitialForm />}

          {paymentInfo.status === 'need-payment' && (
            <Elements stripe={getStripe()}>
              <StripeForm />
            </Elements>
          )}

          {(paymentInfo.status === 'finished' || paymentInfo.status === 'refunded') && <Finished />}
        </Card.Body>
      </Card>

      {paymentInfo.displayApiData && (
        <Row>
          <Card css={{ fontSize: '13px', my: '30px' }}>
            <Card.Header>
              <Text b>API data</Text>
            </Card.Header>
            <DynamicReactJson
              src={paymentInfo.displayApiData}
              collapsed={1}
              displayDataTypes={false}
              enableClipboard={false}
              indentWidth={3}
            />
          </Card>
        </Row>
      )}
    </Grid.Container>
  );
};

export default Checkout;
