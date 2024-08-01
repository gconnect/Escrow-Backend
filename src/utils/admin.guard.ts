import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log(req.user.username);
    if (req.user.username !== 'admin') {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Access denied',
          message: 'Only admins can perform this action.',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }
}
