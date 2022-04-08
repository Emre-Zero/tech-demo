import React, { useMemo, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Grid, Loading, Row, Text } from '@nextui-org/react';

import { useAppSelector, useAppDispatch } from '@client/app/hooks';
import { getPaymentInfo, updatePaymentInfo } from '@client/features/payment/paymentSlice';

const useStripeOptions = () => {
  return useMemo(
    () => ({
      style: {
        base: {
          fontSize: '16px',
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    }),
    []
  );
};

const StripeForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useStripeOptions();
  const [messages, _setMessages] = useState('');
  const [isLoading, setLoading] = useState(false);
  const paymentInfo = useAppSelector(getPaymentInfo);
  const billingInfo = paymentInfo.billingInfo;
  const dispatch = useAppDispatch();

  const setMessage = (message: string) => {
    _setMessages(`${message}`);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Wait for Stripe to load
      return;
    }

    setMessage('');
    setLoading(true);
    const cardElement: any = elements.getElement(CardElement);

    await stripe
      .confirmCardPayment(paymentInfo.clientSecret as string, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: billingInfo?.name,
            address: {
              line1: billingInfo?.address,
              city: billingInfo?.city,
              country: 'US',
              state: billingInfo?.state,
              postal_code: billingInfo?.zipcode.toLocaleString(),
            },
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          setMessage(error.message as string);
          return;
        }
        console.log('paymentResult', paymentIntent);
        dispatch(updatePaymentInfo({ status: 'finished', displayApiData: paymentIntent }));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Grid>
        <Text small color="$purple400" weight="bold">
          Enter card information to finalize
        </Text>
      </Grid>
      <form id="stripe-demo-form" onSubmit={handleSubmit}>
        <CardElement options={options} />
      </form>
      <Text css={{ my: '20px' }} color="error">
        {messages}
      </Text>
      <Row justify="space-around" css={{ mt: '20px' }}>
        <Button disabled={isLoading} size="md" form="stripe-demo-form">
          {isLoading ? <Loading type="points" color="primary" size="sm" /> : 'Subscribe'}
        </Button>
      </Row>
    </div>
  );
};

export default StripeForm;
