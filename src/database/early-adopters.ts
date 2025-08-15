// Entities
import { EarlyAdopter } from "src/entities/early-adopter";

export class EarlyAdoptersRepository {
  private earlyAdopters: EarlyAdopter[] = [];

  async findByEmail(email: string): Promise<EarlyAdopter | null> {
    const earlyAdopter = this.earlyAdopters.find(
      (adopter) => adopter.email === email
    );

    if (!earlyAdopter) {
      return null;
    }

    return earlyAdopter;
  }

  async create(earlyAdopter: EarlyAdopter): Promise<void> {
    this.earlyAdopters.push(earlyAdopter);
  }
}
