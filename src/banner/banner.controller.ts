import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { Banner } from './banner.entity';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';

@Controller('banner')
export class BannerController {
    private logger = new Logger('Banner');
    constructor(private bannerService: BannerService) {}

    @Get()
    getAllBanner(@Request() request): Promise<Banner[]> {
        this.logger.verbose(`Fetching all the banner`);
        const limit = request.query.hasOwnProperty('limit') ? request.query.limit : 10;
        const page = request.query.hasOwnProperty('page') ? request.query.page : 0;
        return this.bannerService.getAllBanner(limit, page);
    }


    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard())
    createBanner(@Body() createBannerDto: CreateBannerDto, @GetUser() user: User): Promise<any> {
        this.logger.verbose(`Creating a banner by user ${user.email}`)
        return this.bannerService.createBanner(createBannerDto, user);
    }
}
