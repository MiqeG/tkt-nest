import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ScanCommandOutput,
  DeleteCommandOutput,
  GetCommandOutput,
  BatchWriteCommandOutput,
  UpdateCommandOutput,
} from '@aws-sdk/lib-dynamodb';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/scan_entreprises')
  scanEntreprises(@Body() body: object): Promise<ScanCommandOutput> {
    return this.appService.scanEntreprises(body);
  }
  @Post('/put_entreprise')
  putEntreprise(@Body() body: entrepriseYear): Promise<ScanCommandOutput> {
    return this.appService.putEntreprise(body);
  }
  @Post('/delete_entreprise')
  deleteEntreprise(@Body() body: entrepriseYear): Promise<DeleteCommandOutput> {
    return this.appService.delteEntreprise(body);
  }
  @Post('/get_entreprise')
  getEntreprise(@Body() body: entrepriseYear): Promise<GetCommandOutput> {
    return this.appService.getEntreprise(body);
  }
  @Post('/batch_write')
  batchWrite(@Body() body: batchRequest): Promise<BatchWriteCommandOutput> {
    return this.appService.batchWtrite(body);
  }
  @Post('/upd_entreprise')
  updateEntreprise(@Body() body: entrepriseYear): Promise<UpdateCommandOutput> {
    return this.appService.updateEntreprise(body);
  }
}
