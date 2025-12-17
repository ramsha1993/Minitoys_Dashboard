
const ENDPOINTS = {
  AUTH: {
    LOGIN: `users/login`,
    REGISTER: `users/register`,
    SEND_OTP: `otp/send-otp`,
    VERIFY_OTP: `otp/verify-otp`,
    UPDATE_PASSWORD: `otp/update-password`,
    USER_LIST:`users/list`
   
  },
  OTHER:
{
   DEPARTMENT:`department`,
   CAPEX:`capex`,
   MODULE:'modules',
   USERS_LIST:`users/list`,
   CAPEX_CATEGORIES:'capex-categories',
   VENDOR:'vendors',
   ROLE:'roles',
   DEPT_NAMES:'department/names',
   CAPEX_BY_DEPT:'capex/department',
   SERVICE_CODE:'service-codes/department'
}



}
  export default ENDPOINTS