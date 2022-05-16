import { Body, Controller, Post } from '@nestjs/common';
import { ExistingUserDTO } from './dtos/existing-user.dto';
import { GetUserDataByEmailDTO } from './dtos/get-user-email.dto';
import { UserDetails } from './user-details.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor (private userService: UserService){}

    @Post('getuseremail')
    register(@Body() getUserDataByEmail: GetUserDataByEmailDTO): Promise<UserDetails | null> {
        return this.userService.getDetailByEmail(getUserDataByEmail);
    }
}
