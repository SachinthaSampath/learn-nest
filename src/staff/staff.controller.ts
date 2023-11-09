import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import CreateStaffDto from './dto/createStaff.dto';
import UpdateStaffDto from './dto/updateStaff.dto';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get()
  getAllStaff() {
    return this.staffService.getAllMembers();
  }

  @Get(':id')
  getStaffById(@Param('id') id: string) {
    return this.staffService.getMemberById(Number(id));
  }

  @Post()
  async createPost(@Body() m: CreateStaffDto) {
    return this.staffService.createMember(m);
  }

  @Patch(':id')
  async updateMember(@Param('id') id: string, @Body() m: UpdateStaffDto) {
    return this.staffService.updateStaff(Number(id), m);
  }

  @Delete(':id')
  async deleteMember(@Param('id') id: string) {
    return this.staffService.deleteStaff(Number(id));
  }
}
