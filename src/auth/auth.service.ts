import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/users.model";
import * as bcrypt from "bcryptjs";
import { ERROR_AUTH_BAD, USER_CREATED, USER_EXISTS } from "../shared/constants";
import { v4 as uuid } from "uuid";

interface PayLoad {
  id: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(private userService: UsersService,
              private jwtService: JwtService) {
  }

  async login(userDto: CreateUserDto): Promise<User> {
    const user: User = await this.validateUser(userDto);

    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto): Promise<any> {
    const client: User = await this.userService.getUserByEmail(userDto.email);

    if (client) {
      throw new HttpException(USER_EXISTS, HttpStatus.BAD_REQUEST);
    }

    const hashPassword: string = await bcrypt.hash(userDto.password, 10);
    const user: User = await this.userService.createUser(Object.assign({}, { id: uuid() }, {
      ...userDto,
      password: hashPassword
    }));

    return {
      userId: user.id,
      message: USER_CREATED
    };
  }

  private async generateToken(user: User): Promise<any> {
    const payLoad: PayLoad = { id: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payLoad)
    };
  }

  private async validateUser(userDto: CreateUserDto): Promise<User> {
    try {
      const user: User = await this.userService.getUserByEmail(userDto.email);
      const passwordEquals: boolean = bcrypt.compare(userDto.password, user.password);

      if (user && passwordEquals) {
        return user;
      }
    } catch (e) {
      throw new UnauthorizedException({ message: ERROR_AUTH_BAD });
    }
  }
}
