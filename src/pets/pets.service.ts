import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {

  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
  ) {}

  async create(createPetDto: CreatePetDto) {
    const pet = this.petRepository.create(createPetDto);
    return await this.petRepository.save(pet);
  }

  async findAll() {
    return await this.petRepository.find({
      relations: ['owner'], // remove if wala pa relation
    });
  }

  async findOne(id: number) {
    const pet = await this.petRepository.findOne({
      where: { id },
      relations: ['owner'], // remove if wala pa relation
    });

    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    return pet;
  }

  async update(id: number, updatePetDto: UpdatePetDto) {
    const pet = await this.findOne(id);

    Object.assign(pet, updatePetDto);

    return await this.petRepository.save(pet);
  }

  async remove(id: number) {
    const pet = await this.findOne(id);

    await this.petRepository.remove(pet);

    return { message: 'Pet deleted successfully' };
  }
}