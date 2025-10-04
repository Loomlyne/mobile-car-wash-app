import React, { createContext, useContext, useState } from 'react';

export type Car = {
  brand: string;
  model: string;
  year: string;
  color: string;
  plate_number: string;
  type: string;
};

type CarContextType = {
  cars: Car[];
  addCar: (car: Car) => void;
  clearCars: () => void;
};

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>([]);

  const addCar = (car: Car) => setCars((prev) => [...prev, car]);
  const clearCars = () => setCars([]);

  return (
    <CarContext.Provider value={{ cars, addCar, clearCars }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCarContext = () => {
  const context = useContext(CarContext);
  if (!context) throw new Error('useCarContext must be used within a CarProvider');
  return context;
}; 