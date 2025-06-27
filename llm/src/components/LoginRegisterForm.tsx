import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


type AuthMode = 'login' | 'register';

const LoginRegisterForm = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const toggleMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
    setFormData({ name: '', email: '', password: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      console.log('Logging in with:', formData);
    } else {
        handleRegister();
    }
  };

  const handleRegister = () => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        localStorage.setItem("user", JSON.stringify(userCredential.user));
        window.location.reload();
      })
          .catch((error) => {
              console.error(error.message);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {authMode === 'login' ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'register' && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {authMode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {authMode === 'login' ? 'Don’t have an account?' : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={toggleMode}
            className="text-blue-600 hover:underline"
          >
            {authMode === 'login' ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginRegisterForm;
