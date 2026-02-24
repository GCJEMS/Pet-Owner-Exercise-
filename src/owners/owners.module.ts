import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Pet } from '../pets/entities/pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Owner, Pet])],
  controllers: [OwnersController],
  providers: [OwnersService],

})
export class OwnersModule {}
