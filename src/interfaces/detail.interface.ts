export interface iDetail {
  id: String;
  first_name: String;
  last_name: String;
  gender: String;
  dob: String;
  contact: String;
  address: String;
  email: String;
  user_id: String;
  department_id?: String;
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
