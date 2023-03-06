import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer, CustomerDocument } from './schemas/customer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const createdCustomer = new this.customerModel(createCustomerDto);
    return createdCustomer.save();
  }

  async findAll() {
    return this.customerModel.find().exec();
  }

  async findOne(id: string) {
    try {
      return await this.customerModel.findById(id).exec();
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Customer not found');
    }
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      await this.customerModel.findByIdAndUpdate(id, updateCustomerDto).exec();
      return `Customer with id ${id} has been updated`;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Customer not found');
    }
  }

  async remove(id: string) {
    try {
      this.customerModel.findByIdAndDelete(id).exec();
      return `Customer with id ${id} has been deleted`;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Customer not found');
    }
  }
}
