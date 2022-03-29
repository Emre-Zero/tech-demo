import { Test } from '@nestjs/testing';
import AppModule from 'src/api/app/app.module';
import { INestApplication } from '@nestjs/common';
import StripeService from "src/api/app/payments/stripe.service";

describe('Application', () => {
  let app: INestApplication;
  let stripeService: StripeService;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    stripeService = app.get(StripeService);
  });

  describe('Stripe', () => {
    it('is valid', () => {
      return expect(stripeService).toBeInstanceOf(StripeService)
    });
  });

});
