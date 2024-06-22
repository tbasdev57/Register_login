import { useState } from "react";
import AuthForm from "./components/login";
import avatar from "./assets/avatar.png";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  // Gérer la connexion de l'utilisateur
  const handleLogin = (email, password) => {
    // Vérifiez les identifiants de l'utilisateur (vous pouvez stocker les identifiants dans localStorage ou ailleurs)
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    const storedFirstName = localStorage.getItem("firstName");

    if (email === storedEmail && password === storedPassword) {
      // Connexion réussie, définissez l'utilisateur connecté
      setUser({ firstName: storedFirstName });
    }
  };

  // Gérer la déconnexion de l'utilisateur
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div
      className="bg-gray-200 min-h-screen"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/photos-gratuite/plantes-aux-couleurs-vives-dans-milieu-naturel_23-2151357897.jpg?t=st=1716485661~exp=1716489261~hmac=354e46a5d363f6224b7810cdec924d0d1a02be974808c6f31d7682063868f4d1&w=1800")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <header className="bg-indigo-600 text-white p-4 flex justify-between">
        <h1>login Application</h1>
        {user && (
          <div className="flex items-center">
            <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
            <p className="mr-2">{user.firstName}</p>
            <button className="bg-blue-500 text-white px-2 py-1 rounded">
              Profil
            </button>
            <button
              onClick={handleLogout}
              className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Déconnexion
            </button>
          </div>
        )}
      </header>
      {/* <div className="container mx- p-4"> */}
      <div className="container">

        {user ? (
          <p>Bienvenue, {user.firstName}!</p>
        ) : (
          <AuthForm onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
}

export default App;
