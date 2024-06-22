import React, { useState } from 'react';
import './login.css'; // Assurez-vous d'importer le fichier CSS pour l'effet de flou

function AuthForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
      setMessage('Connexion réussie');
      onLogin(email, password); // Appeler la fonction de connexion
    } else {
      setMessage('Identifiants incorrects');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    setMessage('Inscription réussie. Vous pouvez maintenant vous connecter.');
  };

  // Condition pour afficher les champs "Prénom" et "Nom" dans le formulaire d'inscription
  let nameFields = null;
  if (!isLoginForm) {
    nameFields = (
      <>
        <input
          type="text"
          className="w-full p-2 mb-2 border rounded"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 mb-2 border rounded"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center h-screen ${isLoginForm ? 'blur-background' : 'blur-background'}`}>
      <div className="mb-4">
        <button
          className={`px-4 py-2 ${isLoginForm ? 'bg-gray-300' : 'bg-indigo-600 text-white'} rounded-l`}
          onClick={() => setIsLoginForm(true)}
        >
          Se connecter
        </button>
        <button
          className={`px-4 py-2 ${isLoginForm ? 'bg-indigo-600 text-white' : 'bg-gray-300'} rounded-r`}
          onClick={() => setIsLoginForm(false)}
        >
          S'inscrire
        </button>
      </div>
      <form className="w-64 p-4 bg-white shadow-lg rounded-lg" onSubmit={isLoginForm ?  handleLoginSubmit : handleSignupSubmit} >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {isLoginForm ? 'Connexion' : 'Inscription'}
        </h2>
        {nameFields} {/* Affichage conditionnel des champs "Prénom" et "Nom" */}
        <input
          type="email"
          className="w-full p-2 mb-2 border rounded"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 mb-2 border rounded"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isLoginForm && (
          <input
            type="password"
            className="w-full p-2 mb-2 border rounded"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded hover-bg-indigo-500">
          {isLoginForm ? 'Se connecter' : "S'inscrire"}
        </button>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </form>
    </div>
  );
}

export default AuthForm;
