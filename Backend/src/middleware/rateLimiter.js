// import rateLimit from 'express-rate-limit';

// const otpLimiter = rateLimit({
//   windowMs: 60 * 60 * 1000,
//   max: 3,
//   message: { success: false, message: 'Too many OTP requests. Try again later.' }
// });

// const signupLimiter = rateLimit({
//   windowMs: 60 * 60 * 1000,
//   max: 5,
//   message: { success: false, message: 'Too many signup attempts. Try again later.' }
// });

// const loginLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 5,
//   skipSuccessfulRequests: true,
//   message: { success: false, message: 'Too many login attempts. Try again in 15 minutes.' }
// });

// const passwordResetLimiter = rateLimit({
//   windowMs: 60 * 60 * 1000,
//   max: 3,
//   message: { success: false, message: 'Too many password reset requests.' }
// });

// const resendLimiter = rateLimit({
//   windowMs: 60 * 60 * 1000,
//   max: 5,
//   message: { success: false, message: 'Too many resend attempts.' }
// });
