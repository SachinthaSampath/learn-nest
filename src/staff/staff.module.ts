import { Module } from '@nestjs/common';
import StaffContoller from './staff.controller';
import StaffService from './staff.service';

/**
 * We use modules to organize our application.
 * The StaffController and StaffService are closely related and belonging to the same application domain.
 */
@Module({
  imports: [],
  controllers: [StaffContoller],
  providers: [StaffService],
})
export class StaffModule {}
