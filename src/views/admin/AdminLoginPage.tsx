// ============================================
// GhostFree — Admin Login & Account Creation Page
// LGU Official Portal Interface
// ============================================


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Shield,
  Mail,
  Lock,
  LogIn,
  UserPlus,
  AlertCircle,
  ArrowLeft,
  Landmark,
  X,
  User,
  MapPin,
  CheckCircle2,
} from "lucide-react";

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, signUp, user, profile, loading, authError, clearAuthError } = useAuth();

  // Mode: 'login' | 'register'
  const [mode, setMode] = useState<"login" | "register">("login");

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [province, setProvince] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if already authenticated as admin
  useEffect(() => {
    if (!loading && user && profile) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [loading, user, profile, navigate]);

  const displayError = localError || authError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearAuthError();

    if (!email.trim()) {
      setLocalError("Please enter your email address.");
      return;
    }
    if (!password) {
      setLocalError("Please enter your password.");
      return;
    }

    if (mode === "register") {
      if (!name.trim()) {
        setLocalError("Please enter your full name or official title.");
        return;
      }
      if (password.length < 6) {
        setLocalError("Password must be at least 6 characters.");
        return;
      }
    }

    setSubmitting(true);
    try {
      if (mode === "login") {
        await signIn(email.trim(), password);
      } else {
        await signUp({
          email: email.trim(),
          password,
          name: name.trim(),
          municipality: municipality.trim(),
          province: province.trim(),
        });
      }
      navigate("/admin/dashboard", { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed. Please try again.";
      setLocalError(msg);
      if (msg.includes("already registered")) {
        setMode("login");
      }
    } finally {
      setSubmitting(false);
    }

  };

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-civic-navy">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-civic-sky/30 border-t-civic-sky rounded-full animate-spin" />
          <p className="text-shield-muted text-sm">Checking session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-civic-navy relative overflow-hidden flex items-center justify-center px-4 py-8">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-civic-blue/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 lg:top-6 lg:left-6 btn-civic btn-ghost text-sm z-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      {/* Auth Card */}
      <div
        className={`
          relative z-10 w-full max-w-md glass-card p-8 sm:p-10
          transition-all duration-600
          ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-civic-blue to-civic-trust flex items-center justify-center mb-4 shadow-civic animate-glow-pulse">
            <Landmark className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            LGU Official Portal
          </h1>
          <p className="text-shield-muted text-sm mt-1.5 text-center">
            {mode === "login"
              ? "Sign in to manage relief funds and verify Merkle roots"
              : "Register as an authorized Local Government Unit officer"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-shield-dark/80 p-1 border border-shield-glass/30 mb-6">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setLocalError(null);
              clearAuthError();
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mode === "login"
                ? "bg-civic-blue text-white shadow-sm"
                : "text-shield-muted hover:text-white"
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setLocalError(null);
              clearAuthError();
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mode === "register"
                ? "bg-civic-blue text-white shadow-sm"
                : "text-shield-muted hover:text-white"
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            Create LGU Account
          </button>
        </div>

        {/* Error Display */}
        {displayError && (
          <div className="mb-6 p-4 rounded-xl bg-accent-danger-soft border border-accent-danger/20 flex items-start gap-3 animate-fade-in-down">
            <AlertCircle className="w-5 h-5 text-accent-danger shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-300 leading-relaxed">{displayError}</p>
            </div>
            <button
              onClick={() => {
                setLocalError(null);
                clearAuthError();
              }}
              className="text-red-400 hover:text-red-300 shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <>
              <div>
                <label htmlFor="admin-name" className="label-civic">
                  <User className="w-3.5 h-3.5 text-civic-sky" />
                  Official Full Name & Title
                </label>
                <input
                  id="admin-name"
                  type="text"
                  className="input-civic"
                  placeholder="e.g. Mayor Juan Dela Cruz"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={submitting}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="admin-muni" className="label-civic">
                    <MapPin className="w-3.5 h-3.5 text-civic-sky" />
                    Municipality / City
                  </label>
                  <input
                    id="admin-muni"
                    type="text"
                    className="input-civic"
                    placeholder="e.g. Tacloban"
                    value={municipality}
                    onChange={(e) => setMunicipality(e.target.value)}
                    disabled={submitting}
                  />
                </div>
                <div>
                  <label htmlFor="admin-prov" className="label-civic">
                    <MapPin className="w-3.5 h-3.5 text-civic-sky" />
                    Province
                  </label>
                  <input
                    id="admin-prov"
                    type="text"
                    className="input-civic"
                    placeholder="e.g. Leyte"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    disabled={submitting}
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label htmlFor="admin-email" className="label-civic">
              <Mail className="w-3.5 h-3.5 text-civic-sky" />
              Official Email Address
            </label>
            <input
              id="admin-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              className="input-civic"
              placeholder="official@lgu.gov.ph"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              required
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="label-civic">
              <Lock className="w-3.5 h-3.5 text-civic-sky" />
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              className="input-civic"
              placeholder="•••••••• (Min. 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-civic btn-primary w-full h-[50px] text-base mt-3 tap-scale"
            id="admin-submit-btn"
          >
            {submitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {mode === "login" ? "Authenticating..." : "Creating Account..."}
              </div>
            ) : mode === "login" ? (
              <>
                <LogIn className="w-4.5 h-4.5" />
                Sign In to Portal
              </>
            ) : (
              <>
                <UserPlus className="w-4.5 h-4.5" />
                Register LGU Official Account
              </>
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="mt-6 pt-5 border-t border-shield-glass/30">
          <div className="flex items-center gap-2 justify-center text-shield-muted text-xs">
            <Shield className="w-3.5 h-3.5 text-accent-success" />
            <span>Secured by Firebase Web2 Shield & Firestore</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
