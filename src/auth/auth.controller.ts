import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";

@ApiTags("Authorization")
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post("/login")
    login(@Body() userDto: CreateUserDto): Promise<any> {
        return this.authService.login(userDto);
    }

    @Post("/signup")
    registration(@Body() userDto: CreateUserDto): Promise<any> {
        return this.authService.registration(userDto);
    }
}
