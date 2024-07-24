
'use client';
import * as React from "react";
import { Toast, ToastProvider as RadixToastProvider, ToastViewport } from "@radix-ui/react-toast";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const toastVariants = cva(
  "pointer-events-auto flex items-center space-x-4 rounded-md p-4 shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-white text-gray-900",
        destructive: "bg-red-600 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof Toast>,
    VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
}

const ToastContext = React.createContext<{
  toast: (props: ToastProps) => void;
  toasts: ToastProps[];
} | null>(null);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const CustomToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const toast = React.useCallback(
    (props: ToastProps) => {
      setToasts((prevToasts) => [...prevToasts, props]);
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider value={{ toast, toasts }}>
      <RadixToastProvider>
        {toasts.map((toast, i) => (
          <Toast key={i} {...toast}>
            <div className={cn(toastVariants({ variant: toast.variant }))}>
              {toast.title && <div className="text-sm font-medium">{toast.title}</div>}
              {toast.description && (
                <div className="mt-1 text-sm">{toast.description}</div>
              )}
            </div>
          </Toast>
        ))}
        <ToastViewport className="fixed bottom-0 right-0 flex max-h-screen flex-col gap-2 p-6" />
        {children}
      </RadixToastProvider>
    </ToastContext.Provider>
  );
};
