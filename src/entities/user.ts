// Libraries
import { randomUUID } from "crypto";

export type UserRole = "CLIENT" | "SERVICE_PROVIDER";

export interface UserProps {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  location: {
    latitude: number;
    longitude: number;
    radius: number;
  };
  createdAt: Date;
  updatedAt: Date | null;
}

export class User {
  private props: UserProps;

  constructor(props: Omit<UserProps, "id" | "createdAt" | "updatedAt">) {
    this.props = {
      ...props,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: null,
    };
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get role(): UserRole {
    return this.props.role;
  }

  get location() {
    return this.props.location;
  }
}
