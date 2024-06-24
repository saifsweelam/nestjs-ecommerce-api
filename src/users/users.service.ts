import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { hash, compare } from "bcrypt";

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: createUserDto.email },
        });
        if (existingUser) {
            throw new HttpException(
                "User with this email already exists",
                HttpStatus.BAD_REQUEST,
            );
        }
        createUserDto.password = await hash(createUserDto.password, 10);
        const user = await this.prisma.user.create({ data: createUserDto });
        return { id: user.id, email: user.email };
    }

    async login(loginDto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: loginDto.email },
        });
        if (!user) {
            throw new HttpException(
                "Either Email or password is incorrect",
                HttpStatus.UNAUTHORIZED,
            );
        }
        const passwordMatch = await compare(loginDto.password, user.password);
        if (!passwordMatch) {
            throw new HttpException(
                "Either Email or password is incorrect",
                HttpStatus.UNAUTHORIZED,
            );
        }
        const payload = { id: user.id, email: user.email };
        return {
            ...payload,
            token: this.jwt.sign(payload, { secret: "TopSecret" }),
        };
    }
}
