import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import './style.css';
import { loginUser, refreshAccessToken  } from '../api/auth';
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import { Margin } from '@mui/icons-material';


const registerUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:3004/users/register', userData);
    return response.data; // You might want to handle response differently based on your backend's response structure
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

const Login = ({ onLogin }) => {
  const { login, isAuthenticated } = useUser();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [formMode, setFormMode] = useState('login');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailRegister, setEmailReg] = useState('');
  const [passwordRegister, setPasswordReg] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
 
  const navigate = useNavigate();

  useEffect(() => {
    const refreshAccessTokenAndRedirect = async () => {
      if (isAuthenticated()) {
        const newAccessToken = await refreshAccessToken();

        if (!newAccessToken) {
          console.log('Failed to refresh access token. Redirect to login page.');
          navigate('/login');
        } else {
          navigate('/dashboard');
        }
      }
    };

    refreshAccessTokenAndRedirect();
  }, [isAuthenticated, navigate]);

  const redirectToDashboard = (userRole) => {
    let dashboardPath = '/';
    
    switch (userRole) {
      case 'admin':
        dashboardPath = '/dashboard';  // Admin dashboard
        break;
      case 'resto':
        dashboardPath = '/ProfileResto';  // Restaurant dashboard
        break;
     
    }
  
    navigate(dashboardPath);  // Redirect to the determined path
  };
  
  

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await loginUser({ ...loginData }, navigate);
      const token = response?.token;
  
      if (response?.error) {
        setError(response.error);
      }
  
      if (token) {
        login({ token, id: response.id, role: response.role, name: response.name });
        redirectToDashboard(response.role);
  
        if (onLogin) {
          onLogin(token);
        }
      } else {
        console.warn('Token not present in the response:', response);
        setError('Login failed. Please verify your email and password.');
      }
  
      if (response?.body) {
        console.log('Response Body:', response.body);
      } else {
        console.warn('Response body not present in the response:', response);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      // Créer un objet contenant les données du formulaire d'inscription
      const userData = {
        prenom: firstName,
        name: lastName,
        email: emailRegister,
        password: passwordRegister,
        confirmPassword: confirmPassword,
        telephone: telephone,  // Add telephone
        adresse: adresse,      // Add adresse
      };
  
      // Appeler la fonction API pour l'enregistrement avec les données du formulaire
      const response = await registerUser(userData);
  
      // Afficher un message de succès via une alerte
      alert('Enregistrement réussi. Veuillez vous connecter.');
  
      // Rediriger l'utilisateur vers la page de connexion après succès
      navigate('/Login');
    } catch (error) {
      // Afficher un message d'erreur si l'enregistrement échoue
      alert('Erreur lors de l\'enregistrement. Veuillez réessayer.');
  
      // Afficher l'erreur dans la console pour débogage
      console.error('Error registering user:', error);
    }
  };
  

  return (
    <div className="flex">
      <div className="w-full md:w-1/2">
        <img src="../../assets/slata.png" alt="Votre image"  />
      </div>
      <div className="w-full md:w-1/2">
        {formMode === 'login' ? (
          <div className=" shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-2xl text-center mb-4">Connexion</h1>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  style={{ color: 'black' }}
                />
                <FaUser className="absolute text-gray-500 right-2 top-3" />
              </div>
              {error && <span className="error">Error</span>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Mot de passe"
                  
                  onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                  style={{ color: 'black' }}
                />
                <FaLock className="absolute text-gray-500 right-2 top-3" />
              </div>
              {error && <span className='error'>Error</span>}
              </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="remember">
                <input className="mr-2 leading-tight" type="checkbox" id="remember" />
                <span className="text-sm">Se rappeler de moi</span>
              </label>
              <p className="text-xs">
                <Link to="/forgot-password" className="text-blue-500 hover:underline">
                  Mot de passe oublié ?
                </Link>
              </p>
            </div>
            <button
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline wider-button"
              style={{ width: '40%' }}
              type="button"
              onClick={handleLogin}
            >
              Connexion
            </button>
            <div className="mt-4">
              <p style={{ color: 'black' }}>
                Vous n’avez pas de compte ?{' '}
                <span className="cursor-pointer text-blue-500" onClick={() => setFormMode('signin')}>
                  <Link to="/CheckEmail"> Register</Link>
                </span>
              </p>
            </div>
            </div>
        ) : (
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <h1 className="text-2xl mb-4">Inscription</h1>
  
  {/* Prénom */}
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
      Prénom
    </label>
    <input
      className="shadow appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      id="firstName"
      type="text"
      placeholder="Prénom"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
    />
  </div>
  
  {/* Nom */}
  <div className="mb-4">
    <label className="block text-black text-sm font-bold mb-2" htmlFor="lastName">
      Nom
    </label>
    <input
      className="shadow appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      id="lastName"
      type="text"
      placeholder="Nom"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
    />
  </div>

  {/* Email */}
  <div className="mb-4">
    <label className="block text-black text-sm font-bold mb-2" htmlFor="emailRegister">
      E-mail
    </label>
    <input
      className="shadow appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      id="emailRegister"
      type="email"
      placeholder="E-mail"
      value={emailRegister}
      onChange={(e) => setEmailReg(e.target.value)}
    />
  </div>

  {/* Telephone */}
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telephoneRegister">
      Téléphone
    </label>
    <input
      className="shadow appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      id="telephoneRegister"
      type="text"
      placeholder="Téléphone"
      value={telephone}
      onChange={(e) => setTelephone(e.target.value)}
    />
  </div>

  {/* Adresse */}
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adresseRegister">
      Adresse
    </label>
    <input
      className="shadow appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      id="adresseRegister"
      type="text"
      placeholder="Adresse"
      value={adresse}
      onChange={(e) => setAdresse(e.target.value)}
    />
  </div>

  {/* Password */}
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordRegister">
      Mot de passe
    </label>
    <input
      className="shadow appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      id="passwordRegister"
      type="password"
      placeholder="Mot de passe"
      value={passwordRegister}
      onChange={(e) => setPasswordReg(e.target.value)}
    />
  </div>

  {/* Confirm Password */}
  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
      Confirmer le mot de passe
    </label>
    <input
      className="shadow appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      id="confirmPassword"
      type="password"
      placeholder="Confirmer le mot de passe"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
    />
  </div>

  <button
    className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="submit"
    onClick={handleRegister}
  >
    S'inscrire
  </button>

  <div className="mt-4">
    {formMode !== 'login' && (
      <p style={{ color: 'black' }}>
        Vous avez déjà un compte ?{' '}
        <span className="cursor-pointer text-blue-500" onClick={() => setFormMode('login')}>
          <Link to="/CheckEmail">Connectez-vous</Link>
        </span>
      </p>
    )}
  </div>
  </form>
        )}
      </div>
    </div>
  );
};

export default Login;
