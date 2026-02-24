import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {

  private pets: any[] = [];
  private id = 1;

  create(createPetDto: CreatePetDto) {
    const pet = {
      id: this.id++,
      ...createPetDto,
    };

    this.pets.push(pet);
    return pet;
  }

  findAll() {
    return this.pets;
  }

  findOne(id: number) {
    const pet = this.pets.find(p => p.id === id);

    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    return pet;
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    const pet = this.findOne(id);

    Object.assign(pet, updatePetDto);

    return pet;
  }

  remove(id: number) {
    const index = this.pets.findIndex(p => p.id === id);

    if (index === -1) {
      throw new NotFoundException('Pet not found');
    }

    this.pets.splice(index, 1);

    return { message: 'Pet deleted successfully' };
  }
}