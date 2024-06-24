import { Controller, Post, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post("register")
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Post("login")
    login(@Body() loginDto: LoginDto) {
        return this.usersService.login(loginDto);
    }
}
