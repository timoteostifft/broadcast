// Entities
import { Match } from "src/entities/match";

export class MatchPresenter {
  static toHTTP(match: Match) {
    return {
      id: match.id,
      clientId: match.clientId,
      serviceProviderId: match.serviceProviderId,
      status: match.status,
      createdAt: match.createdAt,
      updatedAt: match.updatedAt,
    };
  }
}
