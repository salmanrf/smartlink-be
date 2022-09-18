import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginModel } from 'src/auth/models/login.model';
import { jwtVerify } from 'src/common/utils/jwt.utils';
import { promiseTuplify } from 'src/common/utils/promise.utils';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const headers = request['headers'];
    const authorization: string = headers['authorization'];

    if (!authorization) {
      return false;
    }

    console.log('headers', headers);

    const token = authorization.split(' ').pop();

    const [decoded, error] = await promiseTuplify(jwtVerify(token));

    if (error) {
      throw new UnauthorizedException(error);
    }

    const uuid = decoded.payload['id'];
    const username = decoded.payload['username'];
    const session_uuid = decoded.payload['session_id'];

    if (!session_uuid) {
      return false;
    }

    const user = await this.userService.findOne({
      username,
      session_uuid,
    });

    if (!user) {
      return false;
    }

    const req_user: LoginModel = {
      id: uuid,
      name: user.full_name,
      username: user.username,
    };

    request.user = req_user;

    return true;
  }
}
