export type UserRole = 'ADMIN' | 'CUSTOMER';

export interface RequestUser {
  sub: string;
  email: string;
  role: UserRole;
}
