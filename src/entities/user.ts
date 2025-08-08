export interface User {
  id: string;
  name: string;
  email: string;
  location: {
    latitude: number;
    longitude: number;
    radius: number;
  };
}
