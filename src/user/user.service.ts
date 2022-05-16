import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UserDetails } from './user-details.interface';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { GetUserDataByEmailDTO } from './dtos/get-user-email.dto';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel:Model<UserDocument>){}

    _getUserDetails(user: UserDocument): UserDetails {
        return {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({email}).exec();
    }

    async getDetailByEmail(getuserdataByemail: Readonly<GetUserDataByEmailDTO>): Promise<UserDetails | null> {
        const { email } = getuserdataByemail;
        const user = await this.userModel.findOne({email}).exec();
        return this._getUserDetails(user);
    }

    async findById(id: string): Promise<UserDetails | null> {
        const user = await this.userModel.findById(id).exec();
        if (!user) return null;
        return this._getUserDetails(user);
    }

    async create(name: string, email: string, hashedPassword: string): Promise<UserDocument> {
        const newUser = new this.userModel({ name, email,password: hashedPassword,});
        return newUser.save();
    }

    async updateUser(id: string, name: UpdateUserDTO): Promise<UserDetails> {
        const updateuser = await this.userModel.findByIdAndUpdate(id, name);
        if(!updateuser) {
            throw new NotFoundException('User not found');
        }
        return this._getUserDetails(updateuser);
    }

    async deleteUser(id: string): Promise<UserDetails> {
        const deleteuser = await this.userModel.findByIdAndDelete(id);
        if (!deleteuser) {
            throw new NotFoundException('User #${id} not found');
        }
        return this._getUserDetails(deleteuser);
    }
}
