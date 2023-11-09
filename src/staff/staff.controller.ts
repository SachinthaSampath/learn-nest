import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import StaffService from './staff.service';
import CreateStaffDto from './dto/createStaff.dto';
import UpdateStaffDto from './dto/updateStaff.dto';

@Controller('staff')
export default class StaffContoller {
  constructor(private readonly staffService: StaffService) {}

  @Get()
  @HttpCode(203)
  getAppStaff() {
    return this.staffService.getAllStaff();
  }

  @Get(':id')
  getStaffById(@Param('id') id: string) {
    return this.staffService.getStaffById(Number(id));
  }

  @Post()
  @HttpCode(201)
  async createStaff(@Body() person: CreateStaffDto) {
    return this.staffService.createStaff(person);
  }

  @Put(':id')
  async replaceStaff(@Param('id') id: string, @Body() person: UpdateStaffDto) {
    return this.staffService.replaceStaff(Number(id), person);
  }

  @Delete(':id')
  async deleteStaff(@Param('id') id: string) {
    return this.staffService.deleteStaff(Number(id));
  }
}
