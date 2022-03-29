import { Module } from '@nestjs/common';

import ViewController from '@api/view/view.controller';
import ViewService from '@api/view/view.service';

@Module({
  imports: [],
  providers: [ViewService],
  controllers: [ViewController],
})
export default class ViewModule {}
