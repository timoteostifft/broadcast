// Libraries
import fs from "fs";
import path from "path";
import { Database } from "sqlite3";

// Entities
import { EarlyAdopter, EarlyAdopterProps } from "src/entities/early-adopter";

export class EarlyAdoptersRepository {
  private db: Database;

  constructor() {
    this.db = new Database(path.join(__dirname, "../database/database.db"));

    const schema = fs.readFileSync(
      path.join(__dirname, "../database/schema.sql"),
      "utf-8"
    );

    this.db.exec(schema);
  }

  async findByEmail(email: string): Promise<EarlyAdopter | null> {
    return new Promise((resolve, reject) => {
      this.db.get(
        "SELECT * FROM early_adopters WHERE email = ?",
        [email],
        (err, row) => {
          if (err) {
            reject(err);
            return;
          }

          if (!row) {
            resolve(null);
            return;
          }

          resolve(new EarlyAdopter(row as EarlyAdopterProps));
        }
      );
    });
  }

  async create({
    id,
    email,
    createdAt,
    updatedAt,
  }: EarlyAdopter): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO early_adopters (id, email, createdAt, updatedAt) VALUES (?, ?, ?, ?)",
        [id, email, createdAt, updatedAt],
        function (err) {
          if (err) {
            console.error("Erro SQLite:", err);
            reject(err);
            return;
          }
          resolve();
        }
      );
    });
  }
}
