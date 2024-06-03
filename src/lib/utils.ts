import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (z: string) => z[0].toUpperCase() + z.slice(1);

export const logTime = (z: string) => console.log(z, new Date().getSeconds());
