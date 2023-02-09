import { HttpResponseDto } from '@common/dtos'
import { HttpResponse } from '@common/utils'
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import {
  ChangePasswordDto,
  CreatePasswordDto,
  CreateUserDto,
  HasPasswordResDto,
  LoginDto,
  LoginResDto,
} from '@user/dtos'
import { AuthGuard, UserGuard } from '@user/guards'
import { plainToClass } from 'class-transformer'
import { Request } from 'express'
import { AuthService } from '../services/auth.service'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOkResponse({
    type: LoginResDto,
  })
  async register(@Body() createUserDto: CreateUserDto) {
    const data = await this.authService.register(
      plainToClass(CreateUserDto, createUserDto, { excludeExtraneousValues: true })
    )

    return new HttpResponse(data, 'Đăng ký thành công')
  }

  @Post('login')
  @ApiOkResponse({ type: LoginResDto })
  async login(@Body() loginDto: LoginDto) {
    const data = await this.authService.login(
      plainToClass(LoginDto, loginDto, { excludeExtraneousValues: true })
    )
    return new HttpResponse(data, 'Đăng nhập thành công')
  }

  @Get('password')
  @UseGuards(AuthGuard, UserGuard)
  @ApiOkResponse({
    type: HasPasswordResDto,
  })
  async checkHasPassword(@Req() req: Request) {
    return new HttpResponse({ has_password: !!req._user?.password })
  }

  @Post('password')
  @UseGuards(AuthGuard, UserGuard)
  async createPassword(@Req() req: Request, @Body() createPasswordDto: CreatePasswordDto) {
    try {
      const data = await this.authService.createPassword({
        ...plainToClass(CreatePasswordDto, createPasswordDto, {
          excludeExtraneousValues: true,
        }),
        user: req._user,
      })

      return new HttpResponse(data, 'Tạo mới mật khẩu thành công')
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Patch('password')
  @UseGuards(AuthGuard, UserGuard)
  async changePassword(@Req() req: Request, @Body() changePasswordDto: ChangePasswordDto) {
    try {
      const data = await this.authService.changePassword({
        ...plainToClass(ChangePasswordDto, changePasswordDto, {
          excludeExtraneousValues: true,
        }),
        user: req._user,
      })

      return new HttpResponse(data, 'Đổi mật khẩu thành công')
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST)
    }
  }
}
