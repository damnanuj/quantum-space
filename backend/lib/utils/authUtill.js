export const regexPatterns = {
  name: /^[a-zA-Z\s]+$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  username: /^[a-zA-Z0-9]{3,15}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z]{6,}$/, 
};

export const userDataValidation = async ({ name, username, email, password }) => {
  // Trim the input fields
  name = name?.trim();
  username = username?.trim();
  email = email?.trim();
  password = password?.trim();

  
//>>===============Validate each field=============>>
  if (!name || !username || !email || !password) {
    throw new Error("All fields are required");
  }
//>>===============Valid name check=============>>
  if (!regexPatterns.name.test(name)) {
    throw new Error("Please enter a valid name (letters and spaces only)");
  }
//>>===============Valid username check=============>>
  if (!regexPatterns.username.test(username)) {
    throw new Error("Username must be alphanumeric and between 3 to 15 characters.");
  }
//>>===============Valid Email pattern check=============>>
  if (!regexPatterns.email.test(email)) {
    throw new Error("Please enter a valid email address");
  }
//>>==== At least 6 characters with one upper and one lower=====>>
  if (!regexPatterns.password.test(password)) {
    throw new Error("Password must be at least 6 characters long and include an uppercase and a lowercase letter.");
  }
};


