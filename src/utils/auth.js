const { localStorage } = global.window;

const auth = {
  login(data) {
    const { _id,
      dateOfBirth,
      firstName,
      lastName,
      gender,
      height,
      weight,
      role,
      isProfileCompleted,
      address } = data;

      localStorage.userId = _id;
      localStorage.firstName = firstName;
      localStorage.lastName = lastName;
      localStorage.height = height;
      localStorage.weight = weight
      localStorage.birthday = dateOfBirth;
      localStorage.isProfileCompleted = isProfileCompleted;  
      localStorage.address = address,
      localStorage.role = role

  },

  updateProfile(data){
    const {
      address,
      dateOfBirth,
      firstName,
      lastName,
      gender,
      height,
      weight} = data;
    localStorage.firstName = firstName;
    localStorage.lastName = lastName;
    localStorage.gender = gender;
    localStorage.height = height;
    localStorage.weight = weight;
    localStorage.address = address.address
    localStorage.birthday = dateOfBirth;


  },

  userId(){
    return localStorage.id
  },

  firstName() {
    return localStorage.firstName;
  },
  lastName() {
    return localStorage.lastName;
  },
  gender() {
    return localStorage.gender;
  },
  height() {
    return localStorage.height;
  },
  weight() {
    return localStorage.weight;
  },
  isProfileCompleted() {
    return localStorage.isProfileCompleted;
  },
  address() {
    return localStorage.address;
  },
  dateOfBirth() {
    return localStorage.birthday;
  },

  role() {
    return localStorage.role;
  },

  logout() {
    localStorage.clear();
  },
};

export default auth;
