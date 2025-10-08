// Type para lo que retorna el login y usarlo en el contexto
export interface UserAuth {
  id: number;
  username: string;
  email: string;
  name: string;
  lastName: string;
  createdAt: Date;
  photo: string;
  typeUser: string;
  infoUserId: number;
  accessToken: string;
}
