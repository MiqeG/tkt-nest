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
} from '@aws-sdk/client-cognito-identity-provider';
const client = new CognitoIdentityProviderClient({
  region: process.env.REGION,
});

export const signIn = async (
  auth: SignInRequest,
): Promise<AdminInitiateAuthCommandOutput> => {
  const input = {
    // AdminInitiateAuthRequest
    UserPoolId: process.env.COGNITO_USER_POOL, // required
    ClientId: process.env.COGNITO_CLIENT_ID, // required
    AuthFlow:
      'ADMIN_USER_PASSWORD_AUTH' ||
      'ALLOW_USER_PASSWORD_AUTH' ||
      'ALLOW_REFRESH_TOKEN_AUTH', // required
    AuthParameters: {
      USERNAME: auth.email,
      PASSWORD: auth.password,
      NEW_PASSWORD: auth.newPassword,
    },
  };

  const command = new AdminInitiateAuthCommand(input);
  const response = await client.send(command);
  auth.session = response.Session;
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
