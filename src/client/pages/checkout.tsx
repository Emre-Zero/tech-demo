import React, { useMemo, useReducer, useState } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import {
  Button,
  Card,
  Divider,
  Grid,
  Input,
  Link,
  Loading,
  Radio,
  Row,
  Text,
  Spacer,
} from '@nextui-org/react';
import { useBetween } from 'use-between';
import axios from 'axios';
import getStripe from '@client/app/utils/stripe';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });

console.warn('do2', process.env.NEXT_PUBLIC_STRIPE_KEY);

const useData = () => {
  const [paymentInfo, updatePaymentInfo] = useReducer(
    (prevState, updates) => ({ ...prevState, ...updates }),
    {
      plan: 'A',
      status: 'billing-info',
      // clientSecret: 'test',
    }
  );
  return {
    paymentInfo,
    updatePaymentInfo,
  };
};

const useSharedState = () => useBetween(useData);

const Checkout: NextPage = () => {
  const { paymentInfo } = useSharedState();

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

        <Card.Body css={{pt: '$10'}}>

          {paymentInfo.status === 'billing-info' && (
            <InitialForm/>
          )}

          {paymentInfo.status === 'need-payment' && (
            <Elements stripe={getStripe()}>
              <StripeForm/>
            </Elements>
          )}

          {(paymentInfo.status === 'finished' || paymentInfo.status === 'refunded') && (
            <Finished/>
          )}

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

const InitialForm = () => {
  const { paymentInfo, updatePaymentInfo } = useSharedState();
  const [isLoading, setLoading] = useState(false);

  const formValidation = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    zipcode: Yup.number().required('ZIP Code is required'),
    state: Yup.string().required('State is required'),
    discountCode: Yup.string().optional(),
  });
  const formOptions = { resolver: yupResolver(formValidation) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const handlePlanChange = (value) => {
    updatePaymentInfo({ plan: value });
  };

  const onSubmit = async (formData) => {
    await updatePaymentInfo({ ...formData });
    const { plan, discountCode, state } = paymentInfo;
    setLoading(true);
    await axios
      .post('/api/subscription/create', { plan, discountCode, state })
      .then((r) => {
        if (!r?.data?.apiData) {
          return;
        }
        const data = r.data.apiData;
        // TODO: use logger
        console.log('createResult', data);
        updatePaymentInfo({
          status: 'need-payment',
          subscriptionId: data.subscriptionId,
          clientSecret: data.clientSecret,
          displayApiData: data.rawResponse,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text small weight="bold" color="$purple400">
        Enter billing address
      </Text>
      <Grid.Container gap={1} css={{ mt: '5px' }}>
        <Grid>
          <Input
            bordered
            required
            label="Name"
            placeholder="Name"
            status={errors.name ? 'error' : 'primary'}
            {...register('name')}
          />
        </Grid>
        <Spacer y={3.5} />
        <Grid>
          <Input
            bordered
            required
            label="Address"
            placeholder="Address"
            status={errors.address ? 'error' : 'primary'}
            {...register('address')}
          />
        </Grid>
        <Grid>
          <Input
            width="170px"
            bordered
            required
            label="City"
            placeholder="City"
            status={errors.city ? 'error' : 'primary'}
            {...register('city')}
          />
        </Grid>
        <Grid>
          <Input
            width="130px"
            bordered
            required
            label="ZIP Code"
            placeholder="ZIP Code"
            type="number"
            status={errors.zipcode ? 'error' : 'primary'}
            {...register('zipcode')}
          />
        </Grid>
        <Grid>
          {/* This should be a dropdown but UI library hasn't added that yet */}
          <Input
            bordered
            required
            label="State (2 letter)"
            placeholder="State"
            status={errors.state ? 'error' : 'primary'}
            {...register('state')}
          />
        </Grid>
      </Grid.Container>

      <Divider css={{ mt: '20px', mb: '15px' }} />
      <Text small color="$purple400" weight="bold">
        Choose a plan
      </Text>

      <Radio.Group value="A" size="sm" onChange={handlePlanChange}>
        <Radio value="A" squared="true">
          $2.99
          <Radio.Description>monthly recurring</Radio.Description>
        </Radio>
        <Radio value="B" squared="true">
          $28.99
          <Radio.Description>annual recurring (20% off)</Radio.Description>
        </Radio>
      </Radio.Group>

      <Divider css={{ mt: '20px', mb: '10px' }} />
      <Grid.Container gap={1}>
        <Grid>
          <Input
            bordered
            width="180px"
            placeholder="Discount code"
            color="primary"
            {...register('discountCode')}
          />
        </Grid>
      </Grid.Container>

      <Divider css={{ mt: '10px', mb: '20px' }} />

      <Row justify="space-around">
        <Button disabled={isLoading} size="md">
          {isLoading ? <Loading type="points" color="primary" size="sm" /> : 'Continue'}
        </Button>
      </Row>
    </form>
  );
}

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
  const { paymentInfo, updatePaymentInfo } = useSharedState();

  const setMessage = (message) => {
    _setMessages(`${message}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Wait for Stripe to load
      return;
    }

    setMessage('');
    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    await stripe
      .confirmCardPayment(paymentInfo.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: paymentInfo.name,
            address: {
              line1: paymentInfo.address,
              city: paymentInfo.city,
              country: 'US',
              state: paymentInfo.state,
              postal_code: paymentInfo.zipcode,
            },
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          setMessage(error.message);
          return;
        }
        console.log('paymentResult', paymentIntent);
        updatePaymentInfo({ status: 'finished', displayApiData: paymentIntent });
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

const Finished = () => {
  const [refundIsLoading, setRefundLoading] = useState(false);
  const { paymentInfo, updatePaymentInfo } = useSharedState();

  const handleRefund = async (e) => {
    e.preventDefault();
    if (!paymentInfo) {
      return;
    }
    setRefundLoading(true);
    const { subscriptionId } = paymentInfo;
    await axios
      .post('/api/subscription/cancel', { subscriptionId })
      .then((r) => {
        if (!r?.data?.apiData) {
          return;
        }
        console.log('cancelResult', r.data.apiData);
        updatePaymentInfo({ status: 'refunded', displayApiData: r.data.apiData });
      })
      .finally(() => {
        setRefundLoading(false);
      });
  };

  return (
    <Grid.Container justify="center" gap={1} css={{ mt: '30px' }}>

      {paymentInfo.status === 'finished' && (
        <div>
          <Grid>
            <Text h3 css={{ fontWeight: '$bold', color: '$purple500' }}>
              Subscribed successfully!
            </Text>
          </Grid>
          <Grid>
            <Button disabled={refundIsLoading} size="md" onClick={handleRefund}>
              {refundIsLoading ? (
                <Loading type="points" color="primary" size="sm" />
              ) : (
                'Cancel & Refund'
              )}
            </Button>
          </Grid>
        </div>
      )}

      {paymentInfo.status === 'refunded' && (
        <Grid>
          <Text css={{ fontWeight: '$bold', color: '$purple500' }}>
            Cancelled subscription and refunded invoice.
          </Text>
        </Grid>
      )}

    </Grid.Container>
  );
};

export default Checkout;
