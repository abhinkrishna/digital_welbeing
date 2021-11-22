import { IsBoolean, IsDefined, IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateRestrictionDTO {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public app_name: string;

    @IsDefined()
    @IsNotEmpty()
    @IsBoolean()
    public is_active: boolean;

    @IsDefined()
    @IsNotEmpty()
    @IsNumberString()
    public weekdays: number;

    @IsDefined()
    @IsNotEmpty()
    @IsNumberString()
    public weekends: number;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public schedule_data: string;

}

export class UpdateRestrictionDTO {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public app_name: string;

    @IsDefined()
    @IsNotEmpty()
    @IsBoolean()
    public is_active: boolean;

    @IsDefined()
    @IsNotEmpty()
    @IsNumberString()
    public weekdays: number;

    @IsDefined()
    @IsNotEmpty()
    @IsNumberString()
    public weekends: number;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public schedule_data: string;

}