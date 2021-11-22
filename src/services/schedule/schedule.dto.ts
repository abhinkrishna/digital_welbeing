import { IsArray, IsDefined, IsEnum, IsMilitaryTime, IsNotEmpty, IsString } from "class-validator";

export class CreateScheduleDTO {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public user_data: string;

    @IsDefined()
    @IsArray()
    @IsEnum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'], { each: true })
    public days: string;

    @IsDefined()
    @IsNotEmpty()
    @IsMilitaryTime()
    @IsString()
    public start: string;

    @IsDefined()
    @IsNotEmpty()
    @IsMilitaryTime()
    @IsString()
    public end: string;

}

export class UpdateScheduleDTO {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public user_data: string;

    @IsDefined()
    @IsArray()
    @IsEnum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'], { each: true })
    public days: string;

    @IsDefined()
    @IsNotEmpty()
    @IsMilitaryTime()
    @IsString()
    public start: string;

    @IsDefined()
    @IsNotEmpty()
    @IsMilitaryTime()
    @IsString()
    public end: string;

}