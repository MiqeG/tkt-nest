interface entrepriseYear {
  name: string;
  sector: string;
  siren: number;
  ca: number;
  margin: number;
  ebitda: number;
  loss: number;
  year: number;
}
interface primaryKey {
  siren: number;
  year: number;
}
type batchRequestItem = entrepriseYear | primaryKey;
interface batchRequest {
  Items: array[batchRequestItem];
  delete?: boolean;
  put?: boolean;
}
interface sectorOption {
  sector: string;
}
interface SignInRequest {
  email?: string;
  password?: string;
  newPassword?: string;
  session?: string;
  accessToken?: string;
  mfaCode?: string;
  userCode?: string;
  refreshToken?: string;
}
