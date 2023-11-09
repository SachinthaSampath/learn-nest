import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateStaffDto from './dto/createStaff.dto';
import UpdateStaffDto from './dto/updateStaff.dto';
import Staff from './staff.entity';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff) private staffRepository: Repository<Staff>,
  ) {}

  getAllMembers() {
    //With the find function, we can get multiple elements. If we don’t provide ith with any options, it returns all.
    return this.staffRepository.find();
  }

  async getMemberById(id: any) {
    const m = await this.staffRepository.findOne(id);
    if (m) {
      return m;
    }
    throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
  }

  async createMember(m: CreateStaffDto) {
    const newStaff = await this.staffRepository.create(m);
    await this.staffRepository.save(newStaff);
    return newStaff;
  }

  async updateStaff(id: any, m: UpdateStaffDto) {
    await this.staffRepository.update(id, m);
    const updated = this.staffRepository.findOne(id);
    if (updated) {
      return updated;
    }
    throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
  }

  async deleteStaff(id: number) {
    //By checking out the documentation of the DELETE command, we can see that we have access to the count of removed elements. This data is available in the  affected property. If it equals zero, we can assume that the element does not exist.
    const deleteResponse = await this.staffRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
    }
  }
}
