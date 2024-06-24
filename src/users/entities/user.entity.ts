import { Prisma } from "@prisma/client";

export class User implements Prisma.UserGetPayload<{}> {
    id: string;
    email: string;
    name: string;
    password: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}
