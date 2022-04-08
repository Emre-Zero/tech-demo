import React, { useState } from 'react';
import {
  Button,
  Divider,
  Grid,
  Input,
  Loading,
  Radio,
  Row,
  Text,
  Spacer,
} from '@nextui-org/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useAppSelector, useAppDispatch } from '@client/app/hooks';
import { getPaymentInfo, updatePaymentInfo } from '@client/features/payment/paymentSlice';

const InitialForm = () => {
  const paymentInfo = useAppSelector(getPaymentInfo);
  const dispatch = useAppDispatch();
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

  const handlePlanChange = (value: string | number) => {
    dispatch(updatePaymentInfo({ plan: value }));
  };

  const onSubmit = async (formData: any) => {
    await dispatch(updatePaymentInfo({ billingInfo: { ...formData } }));
    const { plan, discountCode, billingInfo } = paymentInfo;
    setLoading(true);
    await axios
      .post('/api/subscription/create', { plan, discountCode, state: billingInfo?.state })
      .then((r) => {
        if (!r?.data?.apiData) {
          return;
        }
        const data = r.data.apiData;
        // TODO: use logger
        console.log('createResult', data);
        dispatch(
          updatePaymentInfo({
            status: 'need-payment',
            subscriptionId: data.subscriptionId,
            clientSecret: data.clientSecret,
            displayApiData: data.rawResponse,
          })
        );
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
};

export default InitialForm;
