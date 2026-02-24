import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Injectable()
export class OwnersService {

  constructor(
    @InjectRepository(Owner)
    private ownerRepository: Repository<Owner>,
  ) {}

  async create(createOwnerDto: CreateOwnerDto) {
    const owner = this.ownerRepository.create(createOwnerDto);
    return await this.ownerRepository.save(owner);
  }

  async findAll() {
    return await this.ownerRepository.find();
  }

  async findOne(id: number) {
    const owner = await this.ownerRepository.findOneBy({ id });

    if (!owner) {
      throw new NotFoundException('Owner not found');
    }

    return owner;
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto) {
    const owner = await this.findOne(id);

    Object.assign(owner, updateOwnerDto);

    return await this.ownerRepository.save(owner);
  }

  async remove(id: number) {
    const owner = await this.findOne(id);

    await this.ownerRepository.remove(owner);

    return { message: 'Owner deleted successfully' };
  }
}