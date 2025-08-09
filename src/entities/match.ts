// Libraries
import { randomUUID } from "crypto";

export type MatchStatus =
  | "PENDING"
  | "ACCEPTED"
  | "DECLINED"
  | "CANCELLED"
  | "COMPLETED";

export interface MatchProps {
  id: string;
  clientId: string;
  serviceProviderId: string;
  status: MatchStatus;
  createdAt: Date;
  updatedAt: Date | null;
}

export class Match {
  private props: MatchProps;

  constructor(props: Omit<MatchProps, "id" | "createdAt" | "updatedAt">) {
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

  get clientId(): string {
    return this.props.clientId;
  }

  get serviceProviderId(): string {
    return this.props.serviceProviderId;
  }

  get status(): MatchStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  belongsToUser(userId: string): boolean {
    return (
      this.props.clientId === userId || this.props.serviceProviderId === userId
    );
  }
}
