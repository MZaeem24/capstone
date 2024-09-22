export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: 'customer' | 'restaurant'; // Roles can be 'customer' or 'restaurant'
    createdAt?: Date;
    updatedAt?: Date;
  
    // Method to compare password (typically used for login)
    matchPassword: (enteredPassword: string) => Promise<boolean>;
  }
  