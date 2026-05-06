"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type AdminToastType = "success" | "error" | "info";

type AdminToast = {
  id: number;
  message: string;
  type: AdminToastType;
  leaving: boolean;
};

type AdminToastOptions = {
  type?: AdminToastType;
  durationMs?: number;
};

type AdminToastContextValue = {
  showToast: (message: string, options?: AdminToastOptions) => number;
  success: (message: string, options?: Omit<AdminToastOptions, "type">) => number;
  error: (message: string, options?: Omit<AdminToastOptions, "type">) => number;
  info: (message: string, options?: Omit<AdminToastOptions, "type">) => number;
  dismissToast: (id: number) => void;
};

const DEFAULT_DURATION_MS = 5000;
const EXIT_DURATION_MS = 220;

const TOAST_META: Record<AdminToastType, { icon: string; className: string; iconClassName: string }> = {
  success: {
    icon: "✓",
    className: "border-emerald-100 bg-white text-[#1e2f45]",
    iconClassName: "bg-emerald-100 text-emerald-600",
  },
  error: {
    icon: "!",
    className: "border-red-100 bg-white text-[#1e2f45]",
    iconClassName: "bg-red-100 text-red-600",
  },
  info: {
    icon: "i",
    className: "border-[#d7e3f4] bg-white text-[#1e2f45]",
    iconClassName: "bg-[#edf4ff] text-[#2d5da8]",
  },
};

const AdminToastContext = createContext<AdminToastContextValue | null>(null);

export function AdminToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<AdminToast[]>([]);
  const nextIdRef = useRef(1);
  const timersRef = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const clearTimer = useCallback((id: number) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const dismissToast = useCallback((id: number) => {
    clearTimer(id);
    setToasts((current) =>
      current.map((toast) => (toast.id === id ? { ...toast, leaving: true } : toast)),
    );

    const exitTimer = setTimeout(() => {
      timersRef.current.delete(id);
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, EXIT_DURATION_MS);
    timersRef.current.set(id, exitTimer);
  }, [clearTimer]);

  const showToast = useCallback(
    (message: string, options: AdminToastOptions = {}) => {
      const normalizedMessage = message.trim();
      if (!normalizedMessage) {
        return 0;
      }

      const id = nextIdRef.current;
      nextIdRef.current += 1;
      const durationMs = options.durationMs ?? DEFAULT_DURATION_MS;

      setToasts((current) => [
        ...current,
        {
          id,
          message: normalizedMessage,
          type: options.type ?? "info",
          leaving: false,
        },
      ]);

      const timer = setTimeout(() => dismissToast(id), durationMs);
      timersRef.current.set(id, timer);
      return id;
    },
    [dismissToast],
  );

  const value = useMemo<AdminToastContextValue>(
    () => ({
      showToast,
      success: (message, options) => showToast(message, { ...options, type: "success" }),
      error: (message, options) => showToast(message, { ...options, type: "error" }),
      info: (message, options) => showToast(message, { ...options, type: "info" }),
      dismissToast,
    }),
    [dismissToast, showToast],
  );

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  return (
    <AdminToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-6 left-1/2 z-[100] flex w-[calc(100vw-3rem)] max-w-sm -translate-x-1/2 flex-col gap-2">
        {toasts.map((toast) => {
          const meta = TOAST_META[toast.type];
          return (
            <div
              key={toast.id}
              role="alert"
              className={`pointer-events-auto flex min-h-12 items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ${
                meta.className
              } ${toast.leaving ? "admin-toast-exit" : "admin-toast-enter"}`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${meta.iconClassName}`}
                aria-hidden="true"
              >
                {meta.icon}
              </span>
              <p className="min-w-0 flex-1 text-[13px] leading-5">{toast.message}</p>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="ml-auto -mr-1 shrink-0 rounded-md p-1 text-[#8fa3bb] transition hover:bg-[#f1f5f9] hover:text-[#374151]"
                aria-label="메시지 닫기"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes admin-toast-slide-up {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes admin-toast-slide-down {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(14px); }
        }

        .admin-toast-enter {
          animation: admin-toast-slide-up 180ms ease-out both;
        }

        .admin-toast-exit {
          animation: admin-toast-slide-down 220ms ease-in both;
        }
      `}</style>
    </AdminToastContext.Provider>
  );
}

export function useAdminToast() {
  const context = useContext(AdminToastContext);
  if (!context) {
    throw new Error("useAdminToast must be used within AdminToastProvider.");
  }

  return context;
}
