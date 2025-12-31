export type Role = "admin" | "member";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role[];
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterResponse extends Omit<User, "role"> {}
