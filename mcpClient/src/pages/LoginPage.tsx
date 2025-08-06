import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Moon, Sun } from 'lucide-react';

// TypeScript interfaces
interface LoginCredentials {
  username: string;
  password: string;
}

interface AnimatedDivProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

interface Theme {
  isDark: boolean;
  background: string;
  cardBackground: string;
  textPrimary: string;
  textSecondary: string;
  inputBackground: string;
  inputBorder?: string;
  buttonBackground: string;
  buttonHover: string;
}

// Custom hook for theme management
const useTheme = (): [Theme, () => void] => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const theme: Theme = {
    isDark,
    background: isDark 
      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' 
      : 'bg-gradient-to-br from-blue-50 via-white to-purple-50',
    cardBackground: isDark 
      ? 'bg-gray-900/90 border-gray-700 backdrop-blur-xl' 
      : 'bg-white/90 border-gray-200 backdrop-blur-xl shadow-xl',
    textPrimary: isDark ? 'text-white' : 'text-gray-900',
    textSecondary: isDark ? 'text-gray-400' : 'text-gray-600',
    inputBackground: isDark 
      ? 'bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500' 
      : 'bg-white border-gray-300 focus:border-blue-500',
    buttonBackground: 'bg-blue-600 hover:bg-blue-700 text-white',
    buttonHover: isDark 
      ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-white' 
      : 'bg-white border-gray-200 hover:bg-gray-50'
  };

  const toggleTheme = (): void => {
    setIsDark(prev => !prev);
  };

  return [theme, toggleTheme];
};

// Animated component (since framer-motion isn't available)
const AnimatedDiv: React.FC<AnimatedDivProps> = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`${className} transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

// Loading spinner component
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center space-x-2">
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
    <span>Signing in...</span>
  </div>
);

// Theme toggle button component
interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  buttonStyles: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle, buttonStyles }) => (
  <div className="absolute top-6 right-6">
    <Button
      variant="outline"
      size="icon"
      onClick={onToggle}
      className={`transition-all duration-300 hover:scale-110 ${buttonStyles}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? (
        <Sun className="h-4 w-4 transition-transform duration-300 rotate-0" />
      ) : (
        <Moon className="h-4 w-4 transition-transform duration-300 rotate-0" />
      )}
    </Button>
  </div>
);

// Background animation component
interface BackgroundAnimationProps {
  isDark: boolean;
}

const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({ isDark }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div 
      className={`absolute -top-1/2 -right-1/2 w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ${
        isDark ? 'bg-purple-500/10' : 'bg-blue-200/30'
      }`} 
      style={{
        animation: 'float 6s ease-in-out infinite'
      }} 
    />
    <div 
      className={`absolute -bottom-1/2 -left-1/2 w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ${
        isDark ? 'bg-blue-500/10' : 'bg-purple-200/30'
      }`}
      style={{
        animation: 'float 8s ease-in-out infinite reverse'
      }} 
    />
  </div>
);

// Input field component
interface InputFieldProps {
  id: string;
  label: string;
  type: 'text' | 'password';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  theme: Theme;
}

const InputField: React.FC<InputFieldProps> = ({ 
  id, label, type, placeholder, value, onChange, theme 
}) => (
  <div className="space-y-2 group">
    <Label 
      htmlFor={id} 
      className={`transition-all duration-200 group-focus-within:text-blue-500 ${
        theme.isDark ? 'text-gray-300' : 'text-gray-700'
      }`}
    >
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      className={`transition-all duration-200 focus:scale-105 ${theme.inputBackground}`}
    />
  </div>
);

// Main login component
const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [theme, toggleTheme] = useTheme();

  const handleInputChange = (field: keyof LoginCredentials) => (value: string): void => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      console.log('Login attempted with:', credentials);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = credentials.username.trim() !== '' && credentials.password.trim() !== '';

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-all duration-500 ${theme.background}`}>
      <ThemeToggle 
        isDark={theme.isDark} 
        onToggle={toggleTheme} 
        buttonStyles={theme.buttonHover} 
      />

      <BackgroundAnimation isDark={theme.isDark} />

      <Card className={`w-full max-w-md relative z-10 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1 ${theme.cardBackground}`}>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className={`text-3xl font-bold transition-all duration-300 ${theme.textPrimary}`}>
            Welcome Back
          </CardTitle>
          <CardDescription className={`transition-all duration-300 ${theme.textSecondary}`}>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <InputField
              id="username"
              label="Username"
              type="text"
              placeholder="Enter your username"
              value={credentials.username}
              onChange={handleInputChange('username')}
              theme={theme}
            />
            
            <InputField
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleInputChange('password')}
              theme={theme}
            />
          </div>
          
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading || !isFormValid}
            className={`w-full transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              isLoading || !isFormValid 
                ? 'opacity-70 cursor-not-allowed' 
                : 'hover:shadow-lg'
            } ${theme.buttonBackground}`}
          >
            {isLoading ? <LoadingSpinner /> : 'Sign in'}
          </Button>
        </CardContent>
      </Card>

      <style>{`
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
`}</style>

    </div>
  );
};

export default LoginPage;