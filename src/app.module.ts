import { Module } from '@nestjs/common';
import { CustomerService } from './customer/customer.service';
import { ProductService } from './product/product.service';
import { VendorService } from './vendor/vendor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {}),
  ],
  providers: [CustomerService, ProductService, VendorService],
})
export class AppModule {}
