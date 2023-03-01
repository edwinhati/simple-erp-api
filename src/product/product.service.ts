import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const createdProduct = new this.productModel(createProductDto);
    return await createdProduct.save();
  }

  async findAll() {
    return await this.productModel.find().exec();
  }

  async findOne(id: string) {
    try {
      const product = await this.productModel.findById(id).exec();
      return product;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Product not found');
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      await this.productModel.findByIdAndUpdate(id, updateProductDto).exec();
      return `Product with id ${id} has been updated`;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Product not found');
    }
  }

  async remove(id: string) {
    try {
      this.productModel.findByIdAndDelete(id).exec();
      return `Product with id ${id} has been deleted`;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Product not found');
    }
  }
}
