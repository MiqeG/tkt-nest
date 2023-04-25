import { Injectable } from '@nestjs/common';
import * as db from './db/db';
import {
  PutCommandOutput,
  ScanCommandOutput,
  DeleteCommandOutput,
  GetCommandOutput,
  BatchWriteCommandOutput,
  UpdateCommandOutput,
} from '@aws-sdk/lib-dynamodb';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async getEntreprise(input: any): Promise<GetCommandOutput> {
    try {
      return await db.get_entreprise(input.siren, input.year);
    } catch (error) {
      return makeError(error);
    }
  }
  async scanEntreprises(input: object): Promise<ScanCommandOutput> {
    try {
      return await db.scan(input);
    } catch (error) {
      return makeError(error);
    }
  }
  async putEntreprise(input: entrepriseYear): Promise<PutCommandOutput> {
    try {
      return await db.put(input);
    } catch (error) {
      return makeError(error);
    }
  }
  async delteEntreprise(input: entrepriseYear): Promise<DeleteCommandOutput> {
    try {
      return await db.deleteEntreprise(input);
    } catch (error) {
      return makeError(error);
    }
  }
  async batchWtrite(input: batchRequest): Promise<BatchWriteCommandOutput> {
    try {
      return await db.batchWtrite(input);
    } catch (error) {
      return makeError(error);
    }
  }
  async updateEntreprise(input: entrepriseYear): Promise<UpdateCommandOutput> {
    try {
      return await db.updateEntreprise(input);
    } catch (error) {
      return makeError(error);
    }
  }
}
function makeError(error: any) {
  return error.message || error.stack || error.code || 'Internal Server Error';
}
