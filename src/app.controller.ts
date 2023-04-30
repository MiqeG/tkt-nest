import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ScanCommandOutput,
  DeleteCommandOutput,
  GetCommandOutput,
  BatchWriteCommandOutput,
  UpdateCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import {
  AdminInitiateAuthCommandOutput,
  AssociateSoftwareTokenCommandOutput,
  ChangePasswordCommandOutput,
  ConfirmForgotPasswordCommandOutput,
  ForgotPasswordCommandOutput,
  RespondToAuthChallengeCommandOutput,
  VerifySoftwareTokenCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/access_token')
  checkAccessToken(): string {
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
  @Post('/scan_options')
  scanOptions(): Promise<UpdateCommandOutput> {
    return this.appService.scanOptions();
  }
  @Post('/change_password')
  changePassword(
    @Body() body: ChangePasswordRequest,
  ): Promise<ChangePasswordCommandOutput> {
    return this.appService.changePassword(body);
  }
  @Post('/login')
  login(@Body() body: SignInRequest): Promise<AdminInitiateAuthCommandOutput> {
    return this.appService.signIn(body);
  }
  @Post('/login/new_password_challenge')
  newPasswordChallenge(
    @Body() body: SignInRequest,
  ): Promise<RespondToAuthChallengeCommandOutput> {
    return this.appService.newPasswordChallenge(body);
  }
  @Post('/login/verify_software_token')
  verifySoftwareToken(
    @Body() body: SignInRequest,
  ): Promise<VerifySoftwareTokenCommandOutput> {
    return this.appService.verifySoftwareToken(body);
  }
  @Post('/login/software_token_mfa')
  softwareTokenMfa(
    @Body() body: SignInRequest,
  ): Promise<RespondToAuthChallengeCommandOutput> {
    return this.appService.softwareTokenMfa(body);
  }
  @Post('/login/refresh_token')
  refreshToken(
    @Headers() headers: any,
  ): Promise<AdminInitiateAuthCommandOutput> {
    return this.appService.refreshTokens(headers['cognito-refresh-token']);
  }
  @Post('/login/forgot_password')
  forgotPassword(
    @Body() body: forgotPasswordRequest,
  ): Promise<ForgotPasswordCommandOutput> {
    return this.appService.forgotPassword(body);
  }
  @Post('/login/mfa_setup')
  mfaSetup(
    @Body() body: SignInRequest,
  ): Promise<AssociateSoftwareTokenCommandOutput> {
    return this.appService.mfaSetup(body);
  }
  @Post('/login/confirm_forgot_password')
  confirmForgotPassword(
    @Body() body: confirmForgotPasswordRequest,
  ): Promise<ConfirmForgotPasswordCommandOutput> {
    return this.appService.confirmForgotPassword(body);
  }
}
