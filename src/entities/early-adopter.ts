// Libraries
import { randomUUID } from "crypto";

export interface EarlyAdopterProps {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export class EarlyAdopter {
  private props: EarlyAdopterProps;

  constructor(
    props: Omit<EarlyAdopterProps, "id" | "createdAt" | "updatedAt">
  ) {
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

  get email(): string {
    return this.props.email;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt;
  }
}
