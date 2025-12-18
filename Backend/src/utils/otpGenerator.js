import crypto from 'crypto';
export const OTP_CONFIG = {
  LENGTH: 6,
  EXPIRY_MINUTES: 5,
  MAX_ATTEMPTS: 5,
  RATE_LIMIT_MINUTES: 60,
  MAX_REQUESTS_PER_HOUR: 5
};


export function secureOtpGenerator(length = 6) {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return crypto.randomInt(min, max + 1).toString();
}
