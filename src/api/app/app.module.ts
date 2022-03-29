import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { ConfigModule, ConfigService } from '@nestjs/config';

import AppController from '@app/app.controller';
import AppService from '@app/app.service';
import { StripeModule } from '@golevelup/nestjs-stripe';
import StripeService from '@app/payments/stripe.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    StripeModule.forRootAsync(StripeModule, {
      useFactory: async (configService: ConfigService) => ({
        apiKey: configService.get<string>('STRIPE_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
    ConsoleModule,
  ],
  providers: [AppService, StripeService],
  controllers: [AppController],
})
export default class AppModule {}
