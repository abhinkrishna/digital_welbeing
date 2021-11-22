import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTO {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public email: string;

}

export class UpdateUserDTO {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public email: string;

}