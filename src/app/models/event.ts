
import { Car } from "./car";
export interface Event {

  eventId: number;
  title: string;
  location: string;
  date: Date;
  description?: string;
  organizedId: number;
  capacity: number;
  carId: number;
  carSearch?: Car;
  createdBy?: string;
  createdOn?: Date;
  updatedBy?: string;
  updatedOn?: Date;
  
}
