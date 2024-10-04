import axios from 'axios';

// let accessToken = null;
// let refreshToken = localStorage.getItem('refreshToken');

const setTokens = (access, refresh) => {
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
};


const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

const removeTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
// const isAuthenticated = () => {
//   return !!getAccessToken();
// };

 const redirectToDashboard = (userRole, navigate) => {
  let dashboardPath = '/';

  switch (userRole) {
    case 'admin':
      dashboardPath = '/dashboard';
      break;
    case 'resto':
      dashboardPath = '/ProfileResto';
      break;
    // Add more cases if needed for other roles
    default:
      break;
  }

  navigate(dashboardPath);
};

const loginUser = async (data, navigate, accessToken, refreshToken) => {
  try {
    const response = await axios.post(`http://localhost:3004/auth/signin`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const { token, refreshToken } = response.data;

    if (token) {
      setTokens(token, refreshToken);
      redirectToDashboard(response.data.role, navigate);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

const refreshAccessToken = async (accessToken, refreshToken) => {
  try {
    const response = await axios.post(`http://localhost:3004/auth/refresh`, {
      refreshToken: refreshToken,
    });

    const newAccessToken = response.data.token;

    if (newAccessToken) {
      setTokens(newAccessToken, refreshToken);
      return newAccessToken;
    }

    return null;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
};

const logout = () => {
  removeTokens();
  window.location.href = '/Login';
};

export { loginUser, refreshAccessToken, logout };