import React, { useState } from 'react';
import { Shield, Mail, Lock, AlertCircle, LogIn, X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { CLINIC_CONFIG } from '../data/clinicData';

interface AdminLoginProps {
  onSuccess: () => void;
  onClose: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onClose }) => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const friendlyError = (msg: string): string => {
    if (msg.toLowerCase().includes('invalid login credentials') || msg.toLowerCase().includes('invalid_credentials')) {
      return 'Incorrect email or password. Please try again.';
    }
    if (msg.toLowerCase().includes('email not confirmed')) {
      return 'Please confirm your email address before logging in.';
    }
    if (msg.toLowerCase().includes('too many requests')) {
      return 'Too many login attempts. Please wait a few minutes and try again.';
    }
    if (msg.toLowerCase().includes('network')) {
      return 'Network error. Please check your connection and try again.';
    }
    return 'Login failed. Please try again.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error: authError } = await signIn(email.trim(), password);
      if (authError) {
        setError(friendlyError(authError.message));
      } else {
        onSuccess();
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header band */}
          <div className="bg-gradient-to-r from-slate-950 via-sky-950 to-teal-950 px-8 py-7 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-500 to-teal-400 flex items-center justify-center shadow-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-sky-300 uppercase tracking-widest">Secure Admin Access</p>
                <h2 className="text-lg font-bold font-serif text-white leading-tight">Staff Portal Login</h2>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {CLINIC_CONFIG.name} — Doctor & Staff Management System.
              Access restricted to authorised personnel only.
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-7 space-y-5">
            {/* Error message */}
            {error && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="admin@alkhair.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-slate-50/50 transition-colors"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-slate-50/50 transition-colors"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-sky-600 via-teal-600 to-sky-700 hover:from-sky-700 hover:to-teal-700 shadow-lg shadow-sky-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying credentials…</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to Admin Portal</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer note */}
            <p className="text-center text-[11px] text-slate-400 pt-1">
              This portal is for clinic staff only. Unauthorised access attempts are logged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
