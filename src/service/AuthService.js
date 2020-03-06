import axios from 'axios';

const AUTH_API_URL = 'https://api.marktube.tv/v1/me';

export default class AuthService {
  static signIn = async ({ email, password }) => {
    return await axios.post(AUTH_API_URL, {
      email,
      password,
    });
  };
  static signOut = token => {
    return axios.delete('https://api.marktube.tv/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
}
