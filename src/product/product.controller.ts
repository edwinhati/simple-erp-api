import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles, Role } from '../roles/roles.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(Role.Admin, Role.Owner)
  async create(@Body() createProductDto: CreateProductDto, @Request() req) {
    return await this.productService.create(createProductDto, req.user);
  }

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.Admin, Role.Owner)
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Request() req,
  ) {
    return await this.productService.update(id, updateProductDto, req.user);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Owner)
  async remove(@Param('id') id: string) {
    return await this.productService.remove(id);
  }
}
