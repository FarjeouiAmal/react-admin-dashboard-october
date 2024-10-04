import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ConsumerProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try { 
        const response = await axios.get('http://localhost:3004/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1>Profil du Consommateur</h1>
      <p>Nom: {user.nom}</p>
      <p>Prénom: {user.prenom}</p>
      <p>Email: {user.email}</p>
      {/* Ajoutez d'autres champs nécessaires */}
    </div>
  );
};

export default ConsumerProfile;
