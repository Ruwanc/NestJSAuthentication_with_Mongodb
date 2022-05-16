import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  //@Inject(ConfigService)
  //public config: ConfigService;
  getHello(): string {
    return 'Hello World!';
    //const databaseConnString: string=this.config.get('MONGO_URI');
    //console.log({databaseConnString});
    //return 'Hello World';
  }
}
