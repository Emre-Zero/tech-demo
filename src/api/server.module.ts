import { Module } from '@nestjs/common';

import AppModule from '@app/app.module';
import ViewModule from '@api/view/view.module';

@Module({
  imports: [AppModule, ViewModule],
})
export default class ServerModule {}
