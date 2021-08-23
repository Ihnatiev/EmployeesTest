import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { NOT_AUTHENTICATED } from "../shared/constants";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req: any = context.switchToHttp().getRequest();
      const authHeader: any = req.headers.authorization;
      const bearer: string = authHeader.split(" ")[0];
      const token: string = authHeader.split(" ")[1];

      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({ message: NOT_AUTHENTICATED });
      }

      req.user = this.jwtService.verify(token, { secret: process.env.JWT_ID });

      return true;
    } catch (e) {
      throw e;
    }
  }
}
