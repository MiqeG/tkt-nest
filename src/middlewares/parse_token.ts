import { CognitoJwtVerifier } from 'aws-jwt-verify';

// Verifier that expects valid access tokens:
const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL,
  tokenUse: 'access',
  clientId: process.env.COGNITO_CLIENT_ID,
});

export default async (token: string) => {
  try {
    const payload = await verifier.verify(
      token, // the JWT as string
    );
    return payload;
  } catch (error) {
    return false;
  }
};
