import Department from "../components/setting/department"

const ENDPOINTS = {
  AUTH: {
    LOGIN: `users/login`,
    REGISTER: `register`,
    REGISTER: `register`,
    SEND_OTP: `otp/send-otp`,
    VERIFY_OTP: `otp/verify-otp`,
    UPDATE_PASSWORD: `otp/update-password`,
   
  },
  OTHER:
{
   DEPARTMENT:`department`,
   CAPEX:`capex`
}



}
  export default ENDPOINTS