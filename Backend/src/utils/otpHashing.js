import crypto from 'crypto';

function otpHashing(otp){
 const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
 return hashedOtp;
}

export default otpHashing;