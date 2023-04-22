import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
const mock_item = {
  name: 'testname',
  sector: 'testsector',
  siren: 99999999,
  ca: 1111111,
  margin: 1111111,
  ebitda: 1111111,
  loss: 1111111,
  year: 2017,
};
describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
    it('should return some Items', async () => {
      expect(await appController.scanEntreprises({ Limit: 10 })).toHaveProperty(
        'Items',
      );
    });
    it('should return $metadata.httpStatusCode 200', async () => {
      expect(
        (await appController.putEntreprise(mock_item)).$metadata.httpStatusCode,
      ).toBe(200);
    });
    it('should return $metadata.httpStatusCode 200', async () => {
      expect(
        (await appController.deleteEntreprise(mock_item)).$metadata
          .httpStatusCode,
      ).toBe(200);
    });
    it('should return undefined Item and $metadata.httpStatusCode 200', async () => {
      const request = await appController.getEntreprise(mock_item);
      expect(request.$metadata.httpStatusCode).toBe(200);
      expect(request.Item).toBeUndefined();
    });
  });
});
