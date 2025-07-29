import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, ArrowRight } from 'lucide-react';
import Cookies from 'js-cookie';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';



const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:4000/login/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username:username,
            password:password
        })
    });
    const data = await response.json();
    if(data.err){
        toast.error("Invalid login")
    }
    else{
        Cookies.set("session",data.session,{expires:7})
        nav("/bot")
    }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      {/* Background Pattern */}
            <Toaster />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/5 rounded-2xl p-8 space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-4">

            {/* <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-900 to-slate-700 rounded-3xl mb-6 shadow-lg shadow-slate-900/20">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <div className="w-5 h-5 bg-slate-900 rounded-lg"></div>
              </div>
            </div> */}
            <h1 className="text-4xl font-bold bg-gradient-to-r mt-0 from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              Sign In
            </h1>
            <p className="text-slate-600">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-semibold text-slate-700 block">
                Username
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-slate-600 transition-colors duration-200" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 placeholder-slate-400 text-slate-800 font-medium hover:border-slate-300"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-slate-700 block">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-slate-600 transition-colors duration-200" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-14 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 placeholder-slate-400 text-slate-800 font-medium hover:border-slate-300"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-slate-900/25 hover:shadow-xl hover:shadow-slate-900/40 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-3">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-lg">Signing in...</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">Sign In</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Accent */}
        {/* <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-slate-400 to-transparent rounded-full"></div> */}
      </div>
    </div>
  );
};

export default LoginPage;