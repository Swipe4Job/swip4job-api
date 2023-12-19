import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UserLogin } from '../../../application/users/UserLogin';
import { UserLoginRequestDTO } from './DTOs/UserLoginRequestDTO';
import { pipe } from 'fp-ts/function';
import * as Either from 'fp-ts/Either';
import { HttpResponse } from '../../../../../shared/infrastructure/HttpResponse';
import { UserLogoutRequestDTO } from './DTOs/UserLogoutRequestDTO';
import { UserLogout } from '../../../application/users/UserLogout';

@Controller('users')
export class AuthUsersController {
  constructor(
    private userLoginUseCase: UserLogin,
    private userLogoutUseCase: UserLogout,
  ) {}
  @Post('login')
  async userLogin(@Body() { email, password }: UserLoginRequestDTO) {
    const result = await this.userLoginUseCase.web2(email, password);
    const { refresh, access } = await pipe(
      result,
      Either.match(
        (err) => {
          throw err;
        },
        (tokens) => tokens,
      ),
    );

    return HttpResponse.success('Logged in successfully').withData({
      accessToken: access,
      refreshToken: refresh,
    });
  }

  @Get('refresh')
  async userRefresh() {}

  @Delete('logout')
  async userLogout(@Body() { token }: UserLogoutRequestDTO) {
    await this.userLogoutUseCase.run(token);
    return HttpResponse.success('Logged out successfully');
  }
}