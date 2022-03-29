import { Controller, Res, Post, Body, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import StripeService from '@app/payments/stripe.service';
import CreateSubscriptionDto from '@app/payments/dto/create-subscription.dto';
import CancelSubscriptionDto from '@app/payments/dto/cancel-subscription.dto';

@Controller()
export default class AppController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('/api/subscription/create')
  async createSubscription(@Res() res: Response, @Body() paymentInfo: CreateSubscriptionDto) {
    const payload = await this.stripeService.createSubscription(paymentInfo);
    res.status(HttpStatus.OK).json({ apiData: payload });
  }

  @Post('/api/subscription/cancel')
  async cancelSubscription(@Res() res: Response, @Body() paymentInfo: CancelSubscriptionDto) {
    const payload = await this.stripeService.cancelSubscription(paymentInfo);
    res.status(HttpStatus.OK).json({ apiData: payload });
  }
}
