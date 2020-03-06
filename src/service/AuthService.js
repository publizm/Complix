import axios from 'axios';

const AUTH_API_URL = 'http://localhost:8000/auth/login';

export default class AuthService {
  static signIn = async ({ email, password }) => {
    return await axios.post(AUTH_API_URL, {
      email,
      password,
    });
  };
}
