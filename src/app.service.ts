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
import {
  signIn,
  newPasswordRequired,
  mfaSetup,
  verifySoftwareToken,
  softwareTokenMfa,
} from './auth/congito_auth';
import {
  AdminInitiateAuthCommandOutput,
  RespondToAuthChallengeCommandOutput,
  AssociateSoftwareTokenCommandOutput,
  VerifySoftwareTokenCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';

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
  async scanOptions(): Promise<UpdateCommandOutput> {
    try {
      return await db.scanOptions();
    } catch (error) {
      return makeError(error);
    }
  }
  async signIn(input: SignInRequest): Promise<AdminInitiateAuthCommandOutput> {
    try {
      return await signIn(input);
    } catch (error) {
      return makeError(error);
    }
  }
  async newPasswordChallenge(
    input: SignInRequest,
  ): Promise<RespondToAuthChallengeCommandOutput> {
    try {
      return await newPasswordRequired(input);
    } catch (error) {
      return makeError(error);
    }
  }
  async mfaSetup(
    input: SignInRequest,
  ): Promise<AssociateSoftwareTokenCommandOutput> {
    try {
      return await mfaSetup(input);
    } catch (error) {
      return makeError(error);
    }
  }
  async verifySoftwareToken(
    input: SignInRequest,
  ): Promise<VerifySoftwareTokenCommandOutput> {
    try {
      return await verifySoftwareToken(input);
    } catch (error) {
      return makeError(error);
    }
  }
  async softwareTokenMfa(
    input: SignInRequest,
  ): Promise<RespondToAuthChallengeCommandOutput> {
    try {
      return await softwareTokenMfa(input);
    } catch (error) {
      return makeError(error);
    }
  }
}
function makeError(error: any) {
  return error.message || error.stack || error.code || 'Internal Server Error';
}
