export type UserRole = "CLIENT" | "SERVICE_PROVIDER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  location: {
    latitude: number;
    longitude: number;
    radius: number;
  };
}
