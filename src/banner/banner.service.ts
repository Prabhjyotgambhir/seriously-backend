import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from './banner.entity';
import { User } from 'src/auth/user.entity';
import { S3Service } from 'src/shared/s3/s3.service';
import { ConfigService } from '@nestjs/config';
import { BannerRepository } from './banner.repository';
import { CreateBannerDto } from './dto/create-banner.dto';

@Injectable()
export class BannerService {
    public logger = new Logger('Banner');

    constructor(@InjectRepository(BannerRepository) private bannerRepository: BannerRepository, private s3Service: S3Service,
    private configService: ConfigService) {}

    public async getAllBanner(limit: number, page: number): Promise<any> {
        const banner = await this.bannerRepository.find();
        return banner;
    }

    public async createBanner(createBannerDto: CreateBannerDto, user: User): Promise<any> {
        const { title, categoryId, image} = createBannerDto;
        const banner = new Banner();
        const data = await this.saveImage(image);
        banner.title = title;
        banner.categoryId = categoryId;
        banner.imagePath = data.val.path; 
        banner.image = data.name;
        banner.userId = user.id;
        try {
            await banner.save();
        } catch(error) {
            console.log(error);
            this.logger.error(`Error while creating a banner by user ${user.email}`);
        }
        this.bannerRepository.save(banner);
        delete banner.userId;
        return { data: banner, message: 'Banner created Succesfully'}
    }

    public async saveImage(image: string): Promise<any> {
        const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        const type = image.split(';')[0].split('/')[1];
        const name = 'Img_' + Date.now() + '.' + type;
        const path = 'main advert/';
        const val = await this.s3Service.imageUpload((path + name), base64Data, type);
        console.log(val, "VAL");
        return { name: name, val: val};
    }

}
