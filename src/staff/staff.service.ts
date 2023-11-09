/* eslint-disable prettier/prettier */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Person } from './person.interface';
import UpdateStaffDto from './dto/updateStaff.dto';
import CreateStaffDto from './dto/createStaff.dto';

//the job of a service to separate the business logic from controllers
@Injectable()
export default class StaffService {
  private lastStaffId = 0;
  private staff: Person[] = [];

  getAllStaff() {
    return this.staff;
  }

  getStaffById(id: number) {
    const _s = this.staff.find((s) => s.id === id);
    if (_s) {
      return _s;
    } else {
      throw new HttpException('Staff person not found', HttpStatus.NOT_FOUND);
    }
  }

  replaceStaff(id: number, person: UpdateStaffDto) {
    const staffIndex = this.staff.findIndex((s) => s.id === id);
    if (staffIndex > -1) {
      this.staff[staffIndex] = person;
      return person;
    }
    throw new HttpException('Staff person not found', HttpStatus.NOT_FOUND);
  }

  createStaff(person: CreateStaffDto) {
    const newPerson = {
      id: ++this.lastStaffId,
      ...person,
    };
    this.staff.push(newPerson);
    return newPerson;
  }

  deleteStaff(id: number) {
    const staffIndex = this.staff.findIndex((s) => s.id === id);
    if (staffIndex > -1) {
      return this.staff.splice(staffIndex, 1)[0];
    }
    throw new HttpException('Staff person not found', HttpStatus.NOT_FOUND);
  }
}
