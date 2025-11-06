import type React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-linear-to-b from-background via-card/50 to-background flex flex-col items-center justify-center px-4 py-12 sm:py-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative w-full max-w-md">
        {/* Logo and branding */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 bg-linear-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <span className="font-bold text-lg gradient-text">InterviewAI</span>
        </div>

        {/* Form card */}
        {children}
      </div>

      {/* Footer */}
      <div className="relative mt-8 text-center text-xs text-muted-foreground max-w-md">
        <p>© 2025 InterviewAI. Your path to success.</p>
      </div>
    </div>
  );
}
