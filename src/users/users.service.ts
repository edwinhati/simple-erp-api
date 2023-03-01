import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, username, email, password } = createUserDto;

    const existingUser = await this.userModel
      .findOne()
      .or([{ email }, { username }]);
    if (existingUser) {
      const conflictField = existingUser.email === email ? 'Email' : 'Username';
      throw new ConflictException(`${conflictField} already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      name,
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(username: string): Promise<User | undefined> {
    return await this.userModel
      .findOne()
      .or([{ email: username }, { username }])
      .exec();
  }
}
