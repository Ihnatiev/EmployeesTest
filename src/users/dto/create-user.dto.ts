import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({example: "user@mail.ua", description: "Email"})
  @IsString({message: "Should be a string"})
  @IsEmail({}, {message: "Invalid email"})
  readonly email: string;

  @ApiProperty({example: "159357Pass", description: "Password"})
  @IsString({message: "Should be a string"})
  @Length(4, 16, {message: "Not less than 4 and not more than 16"})
  readonly password: string;
}
