export interface UserDetails {
  email: string;
  password: string;
}
// type Role = "Admin" | "User";
export interface UserSignupDetails extends UserDetails{
  role: "Admin" | "User"
}
export interface UserLoginDetails extends UserDetails{
  role: "Admin" | "User"
}