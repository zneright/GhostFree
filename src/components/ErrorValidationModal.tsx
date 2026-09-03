// ============================================
// GhostFree — ErrorValidationModal
// Modal dialog for validation and alert feedback
// ============================================


import React from "react";
import { AlertCircle, X, ArrowRight } from "lucide-react";

interface ErrorValidationModalProps {
  isOpen: boolean;
  error: string | null;
  onClose: () => void;
  title?: string;
  actionText?: string;
  onAction?: () => void;
}

export const ErrorValidationModal: React.FC<ErrorValidationModalProps> = ({
  isOpen,
  error,
  onClose,
  title = "Authentication Notice",
  actionText,
  onAction,
}) => {
  if (!isOpen || !error) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="glass-card max-w-md w-full p-6 sm:p-7 border border-accent-danger/30 shadow-civic-lg animate-scale-in">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-accent-danger-soft border border-accent-danger/20 flex items-center justify-center shrink-0">
            <AlertCircle className="w-6 h-6 text-accent-danger" />
          </div>
          <button
            onClick={onClose}
            className="text-shield-muted hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-shield-muted text-sm leading-relaxed mb-6">
          {error}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {actionText && onAction && (
            <button
              onClick={() => {
                onAction();
                onClose();
              }}
              className="btn-civic btn-primary w-full sm:flex-1 py-2.5 text-sm"
            >
              {actionText}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="btn-civic btn-secondary w-full sm:w-auto py-2.5 text-sm"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorValidationModal;
