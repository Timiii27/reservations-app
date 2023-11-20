export interface Reservation {
    id: number;
    name: string;
    numberOfPeople: number;
    date: string;
    time: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  }
