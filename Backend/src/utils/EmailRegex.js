import AppError from "./AppError";

export function EmailRegex(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          throw new AppError("Invalid email format", 400);
        }
        return emailRegex
}