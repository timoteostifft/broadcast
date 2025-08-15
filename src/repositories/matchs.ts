// Entities
import { Match } from "src/entities/match";

export class MatchsRepository {
  public matchs: Match[] = [];

  async create(match: Match): Promise<void> {
    this.matchs.push(match);
  }

  async findById(id: string): Promise<Match | null> {
    const match = this.matchs.find((match) => match.id === id);

    if (!match) {
      return null;
    }

    return match;
  }
}
