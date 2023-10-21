import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { Repository } from 'typeorm';
import { City } from 'src/cities/entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly citiesRepository: Repository<City>) {
  }

  async create(createCityDto: CreateCityDto) {
    const city = this.citiesRepository.create(createCityDto);

    return await this.citiesRepository.save(city);
  }

  async findAll() {
    return await this.citiesRepository.find();
  }

  async findOne(id: number) {
    return await this.citiesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    const city = await this.findOne(id);
    if (!city) {
      throw new NotFoundException();
    }

    Object.assign(city, updateCityDto);

    return await this.citiesRepository.save(city);
  }

  async remove(id: number) {
    const city = await this.findOne(id);
    if (!city) {
      throw new NotFoundException();
    }

    return await this.citiesRepository.remove(city);
  }
}
