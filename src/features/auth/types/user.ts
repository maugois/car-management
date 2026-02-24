export interface User {
  id: string;
  name: string | null; 
  email: string;
  accessToken: string;
  image?: string;     
}