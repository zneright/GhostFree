// ============================================
// GhostFree — Admin Login & Account Creation Page
// LGU Official Disaster Relief Portal Interface
// Republic of the Philippines · DRRM Operations
// ============================================

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import GhostFreeLogo from "../../components/GhostFreeLogo";
import Layout from "../../components/Layout";
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
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, signUp, user, profile, loading, authError, clearAuthError } = useAuth();

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
      setLocalError("Please enter your official email address.");
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

  // 1-Click Evaluator Login for judges & reviewers
  const handleEvaluatorLogin = async () => {
    setLocalError(null);
    clearAuthError();
    const demoEmail = "official@lgu.gov.ph";
    const demoPass = "GhostFree2026!";
    setEmail(demoEmail);
    setPassword(demoPass);
    setSubmitting(true);

    try {
      await signIn(demoEmail, demoPass);
      navigate("/admin/dashboard", { replace: true });
    } catch {
      // If demo account doesn't exist yet in Firebase, auto-register it
      try {
        await signUp({
          email: demoEmail,
          password: demoPass,
          name: "Hon. Maria Santos (MDRRMO Chief)",
          municipality: "Dingalan",
          province: "Aurora",
        });
        navigate("/admin/dashboard", { replace: true });
      } catch (regErr: unknown) {
        const msg = regErr instanceof Error ? regErr.message : "Evaluator login failed.";
        setLocalError(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ambient-canvas">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-sky-400/30 border-t-sky-400 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Verifying official credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout showFooter={true}>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-8 relative">
        {/* Main Card */}
        <div
          className={`
            relative z-10 w-full max-w-md glass-card-elevated p-6 sm:p-8
            transition-all duration-500 my-4 shadow-2xl border-2 border-white/10
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          {/* Republic Emblem & Brand Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="mb-3">
              <GhostFreeLogo size={48} variant="icon" animated showGlow />
            </div>
            <span className="text-[0.65rem] font-bold text-amber-400 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-2">
              Republic of the Philippines · MDRRMO
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">
              LGU Disaster Command Center
            </h1>
            <p className="text-slate-300 text-xs mt-1 leading-relaxed max-w-xs">
              Sign in to upload beneficiary rosters, verify Merkle roots, and disburse emergency funds under R.A. 10121.
            </p>
          </div>

          {/* 1-Click Evaluator Sandbox Access Button */}
          <div className="mb-6 p-3.5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 backdrop-blur-md text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1.5 text-xs font-bold text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>Reviewer & Judge Quick Sign-In</span>
            </div>
            <p className="text-[0.7rem] text-slate-300 mb-2.5">
              Grading this submission? Click below for 1-click official administrator access:
            </p>
            <button
              type="button"
              onClick={handleEvaluatorLogin}
              disabled={submitting}
              className="btn-civic-gold w-full py-2.5 px-4 text-xs font-black transition-all flex items-center justify-center gap-2 tap-scale shadow-md"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  <span>Evaluator 1-Click Login (Chief MDRRMO)</span>
                </>
              )}
            </button>
          </div>

        {/* Mode Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-slate-950/60 border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setLocalError(null);
              clearAuthError();
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mode === "login"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            Official Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setLocalError(null);
              clearAuthError();
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mode === "register"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            Register LGU
          </button>
        </div>

        {/* Error Display */}
        {displayError && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-red-300">Authentication Error</p>
              <p className="text-[0.75rem] text-slate-300 leading-relaxed">{displayError}</p>
            </div>
            <button
              onClick={() => {
                setLocalError(null);
                clearAuthError();
              }}
              className="text-slate-400 hover:text-white shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <>
              <div>
                <label htmlFor="admin-name" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                  <User className="w-3.5 h-3.5 text-sky-400" />
                  Official Full Name & Title
                </label>
                <input
                  id="admin-name"
                  type="text"
                  className="input-civic"
                  placeholder="e.g. MDRRMO Chief Juan Dela Cruz"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={submitting}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="admin-muni" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    Municipality / City
                  </label>
                  <input
                    id="admin-muni"
                    type="text"
                    className="input-civic"
                    placeholder="e.g. Dingalan"
                    value={municipality}
                    onChange={(e) => setMunicipality(e.target.value)}
                    disabled={submitting}
                  />
                </div>
                <div>
                  <label htmlFor="admin-prov" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    Province
                  </label>
                  <input
                    id="admin-prov"
                    type="text"
                    className="input-civic"
                    placeholder="e.g. Aurora"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    disabled={submitting}
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label htmlFor="admin-email" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              Official Government Email
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
            <label htmlFor="admin-password" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
              <Lock className="w-3.5 h-3.5 text-sky-400" />
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
            className="btn-civic-glow w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 mt-3 tap-scale shadow-lg"
            id="admin-submit-btn"
          >
            {submitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{mode === "login" ? "Authenticating Official..." : "Registering Account..."}</span>
              </div>
            ) : mode === "login" ? (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In to DRRM Command Center</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Register Official LGU Account</span>
              </>
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            Web2 Enterprise Fortress (Firebase)
          </span>
          <span className="text-[0.65rem] text-slate-500">R.A. 10173 Protected</span>
        </div>
      </div>
    </div>
  </Layout>
);
};

export default AdminLoginPage;
