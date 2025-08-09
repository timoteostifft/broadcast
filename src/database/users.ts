// Entities
import { User, UserRole } from "../entities/user";

export interface UsersRepositorySearchRequest {
  roles: UserRole[];
  location: {
    latitude: number;
    longitude: number;
    radius: number;
  };
}

export class UsersRepository {
  public users: User[] = [
    new User({
      name: "John Doe",
      email: "john.doe@example.com",
      role: "CLIENT",
      location: {
        latitude: -23.5505,
        longitude: -46.6333,
        radius: 10,
      },
    }),
    new User({
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "SERVICE_PROVIDER",
      location: {
        latitude: -23.59,
        longitude: -46.62,
        radius: 15,
      },
    }),
    new User({
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      role: "SERVICE_PROVIDER",
      location: {
        latitude: -23.5902,
        longitude: -46.6201,
        radius: 15,
      },
    }),
  ];

  public async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  public async list({
    roles,
    location,
  }: UsersRepositorySearchRequest): Promise<User[]> {
    const { latitude, longitude, radius } = location;

    return this.users.filter((user) => {
      if (!roles.includes(user.role)) {
        return false;
      }

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
