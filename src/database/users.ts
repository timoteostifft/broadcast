// Entities
import { User } from "../entities/user";

export interface UsersRepositorySearchRequest {
  location: {
    latitude: number;
    longitude: number;
    radius: number;
  };
}

export class UsersRepository {
  private users = [
    {
      id: "user123",
      name: "John Doe",
      email: "john.doe@example.com",
      location: {
        latitude: -23.5505,
        longitude: -46.6333,
        radius: 10,
      },
    },
    {
      id: "user456",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      location: {
        latitude: -23.59,
        longitude: -46.62,
        radius: 15,
      },
    },
    {
      id: "user789",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      location: {
        latitude: -22.9068,
        longitude: -43.1729,
        radius: 20,
      },
    },
  ];

  public async list({
    location,
  }: UsersRepositorySearchRequest): Promise<User[]> {
    const { latitude, longitude, radius } = location;

    return this.users.filter((user) => {
      const R = 6371;
      const dLat = ((user.location.latitude - latitude) * Math.PI) / 180;
      const dLon = ((user.location.longitude - longitude) * Math.PI) / 180;

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((latitude * Math.PI) / 180) *
          Math.cos((user.location.latitude * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      return distance <= radius + user.location.radius;
    });
  }
}
