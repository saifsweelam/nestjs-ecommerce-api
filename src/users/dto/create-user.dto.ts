import { Prisma } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

type UserCreateBody = Prisma.UserCreateArgs["data"];
type Common<T> = Pick<T, keyof T>;
export class CreateUserDto implements Common<UserCreateBody> {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;

    @IsStrongPassword()
    password: string;

    address?: string;
}
