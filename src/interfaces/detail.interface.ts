export interface iDetail {
  first_name: String;
  last_name: String;
  gender: String;
  dob: String;
  contact: String;
  address: String;
  email: String;
  user_id: String;
  role: {};
  department: {};
}

export interface iRole {
  description: String;
  id: String;
  role_code: String;
  title: String;
}

export interface iDepartment {
  id: String;
  name: String;
  hod: String;
}
