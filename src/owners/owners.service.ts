import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Injectable()
export class OwnersService {

  private owners: any[] = [];
  private id = 1;

  create(createOwnerDto: CreateOwnerDto) {
    const owner = {
      id: this.id++,
      ...createOwnerDto,
    };

    this.owners.push(owner);
    return owner;
  }

  findAll() {
    return this.owners;
  }

  findOne(id: number) {
    const owner = this.owners.find(o => o.id === id);

    if (!owner) {
      throw new NotFoundException('Owner not found');
    }

    return owner;
  }

  update(id: number, updateOwnerDto: UpdateOwnerDto) {
    const owner = this.findOne(id);

    Object.assign(owner, updateOwnerDto);

    return owner;
  }

  remove(id: number) {
    const index = this.owners.findIndex(o => o.id === id);

    if (index === -1) {
      throw new NotFoundException('Owner not found');
    }

    this.owners.splice(index, 1);

    return { message: 'Owner deleted successfully' };
  }
}