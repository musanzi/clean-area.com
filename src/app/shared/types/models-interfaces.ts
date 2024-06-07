export interface Role {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  phone_number: string;
  address: string;
  token: string;
  google_image: string;
  profile: string;
  created_at: Date;
  updated_at: Date;
  roles: Role[];
}
