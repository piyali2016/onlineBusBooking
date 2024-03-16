export interface Bus {
    id: number;
    name: string;
    source: string;
    destination: string;
    departureTime: string;
    fare: number;
    coachType: string;
    seatCount: number;
  }
  export class Seat {
    id: number;
    busId: number;
    seatNumber: string;
    available: boolean;
    fare:any;
  
    constructor(data: any) {
      this.id = data.id;
      this.busId = data.busId;
      this.seatNumber = data.seatNumber;
      this.available = data.available === "true"; // Convert string to boolean
      this.fare = data.fare; // Convert string to boolean
    }
  }
  