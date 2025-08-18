// Libraries
import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

// Entities
import { EarlyAdopter, EarlyAdopterProps } from "src/entities/early-adopter";

export class EarlyAdoptersRepository {
  private db: InstanceType<typeof Database>;

  constructor() {
    this.db = new Database(path.join(__dirname, "../database/database.db"));

    const schema = fs.readFileSync(
      path.join(__dirname, "../database/schema.sql"),
      "utf-8"
    );

    this.db.exec(schema);
  }

  findByEmail(email: string): EarlyAdopter | null {
    const row = this.db
      .prepare("SELECT * FROM early_adopters WHERE email = ?")
      .get(email);
    if (!row) return null;
    return new EarlyAdopter(row as EarlyAdopterProps);
  }

  create({ id, email, createdAt, updatedAt }: EarlyAdopter): void {
    try {
      this.db
        .prepare(
          "INSERT INTO early_adopters (id, email, createdAt, updatedAt) VALUES (?, ?, ?, ?)"
        )
        .run(id, email, createdAt, updatedAt);
    } catch (err) {
      console.error("Erro SQLite:", err);
      throw err;
    }
  }
}
