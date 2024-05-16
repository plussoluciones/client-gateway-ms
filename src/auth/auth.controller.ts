import {
  Body,
  Controller,
  Inject,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config/services';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';
import { CurrentUser } from './interfaces/current-user.interface';

@Controller('auth')
export class AuthController {
  logger = new Logger('Auth-Controller');
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    try {
      const user = await firstValueFrom(
        this.client.send('auth.register.user', registerUserDto),
      );
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    try {
      const user = await firstValueFrom(
        this.client.send('auth.login.user', loginUserDto),
      );
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Post('verify')
  async verifyUser(@User() user: CurrentUser, @Token() token: string) {
    // const user = req['user'];
    // const token = req['token'];
    return { user, token };
    // try {
    //   const userdb = await firstValueFrom(
    //     this.client.send('auth.verify.user', user),
    //   );
    //   return userdb;
    // } catch (error) {
    //   throw new RpcException(error);
    // }
  }
}
