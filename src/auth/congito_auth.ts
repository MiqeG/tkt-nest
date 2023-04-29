import {
  CognitoIdentityProviderClient,
  AdminInitiateAuthCommand,
  AdminInitiateAuthCommandOutput,
  AssociateSoftwareTokenCommand,
  AssociateSoftwareTokenCommandOutput,
  RespondToAuthChallengeCommand,
  RespondToAuthChallengeCommandOutput,
  VerifySoftwareTokenCommand,
  VerifySoftwareTokenCommandOutput,
  ChangePasswordCommand,
  ChangePasswordCommandOutput,
  ForgotPasswordCommand,
  ForgotPasswordCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';
const client = new CognitoIdentityProviderClient({
  region: process.env.REGION,
});
export const forgotPassword = async (
  email: string,
): Promise<ForgotPasswordCommandOutput> => {
  const input = {
    // ForgotPasswordRequest
    ClientId: process.env.COGNITO_CLIENT_ID, // required
    Username: email, // required
  };
  const command = new ForgotPasswordCommand(input);
  const response = await client.send(command);
  return response;
};
export const changePassword = async (
  body: ChangePasswordRequest,
): Promise<ChangePasswordCommandOutput> => {
  const input = {
    // ChangePasswordRequest
    PreviousPassword: body.previousPassword, // required
    ProposedPassword: body.password, // required
    AccessToken: body.accessToken, // required
  };
  const command = new ChangePasswordCommand(input);
  const response = await client.send(command);
  return response;
};
export const refreshTokens = async (
  auth: SignInRequest,
): Promise<AdminInitiateAuthCommandOutput> => {
  const input = {
    // AdminInitiateAuthRequest
    UserPoolId: process.env.COGNITO_USER_POOL, // required
    ClientId: process.env.COGNITO_CLIENT_ID, // required
    AuthFlow: 'REFRESH_TOKEN_AUTH',
    AuthParameters: {
      REFRESH_TOKEN: auth.refreshToken,
    },
  };
  const command = new AdminInitiateAuthCommand(input);
  const response = await client.send(command);
  return response;
};
export const signIn = async (
  auth: SignInRequest,
): Promise<AdminInitiateAuthCommandOutput> => {
  const input = {
    // AdminInitiateAuthRequest
    UserPoolId: process.env.COGNITO_USER_POOL, // required
    ClientId: process.env.COGNITO_CLIENT_ID, // required
    AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
    AuthParameters: {
      USERNAME: auth.email,
      PASSWORD: auth.password,
      NEW_PASSWORD: auth.newPassword,
    },
  };

  const command = new AdminInitiateAuthCommand(input);
  const response = await client.send(command);
  return response;
};
export const softwareTokenMfa = async (
  auth: SignInRequest,
): Promise<RespondToAuthChallengeCommandOutput> => {
  const input = {
    ChallengeName: 'SOFTWARE_TOKEN_MFA',
    ChallengeResponses: {
      USERNAME: auth.email,
      SOFTWARE_TOKEN_MFA_CODE: auth.mfaCode,
    },
    ClientId: process.env.COGNITO_CLIENT_ID,
    Session: auth.session,
  };
  const command = new RespondToAuthChallengeCommand(input);
  const response = await client.send(command);
  return response;
};
export const newPasswordRequired = async (
  auth: SignInRequest,
): Promise<RespondToAuthChallengeCommandOutput> => {
  const input = {
    ChallengeName: 'NEW_PASSWORD_REQUIRED',
    ChallengeResponses: {
      USERNAME: auth.email,
      PASSWORD: auth.password,
      NEW_PASSWORD: auth.newPassword,
    },
    ClientId: process.env.COGNITO_CLIENT_ID,
    Session: auth.session,
  };
  const command = new RespondToAuthChallengeCommand(input);
  const response = await client.send(command);
  return response;
};
export const mfaSetup = async (
  auth: SignInRequest,
): Promise<AssociateSoftwareTokenCommandOutput> => {
  const input = {
    AccessToken: auth.accessToken,
    Session: auth.session,
  };
  const command = new AssociateSoftwareTokenCommand(input);
  const response = await client.send(command);
  return response;
};
export const verifySoftwareToken = async (
  auth: SignInRequest,
): Promise<VerifySoftwareTokenCommandOutput> => {
  const input = {
    UserCode: auth.userCode,
    Session: auth.session,
  };
  const command = new VerifySoftwareTokenCommand(input);
  const response = await client.send(command);
  auth.session = response.Session;
  return await signIn(auth);
};
