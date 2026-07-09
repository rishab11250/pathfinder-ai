import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto w-full max-w-md",
            card: "bg-card border border-border shadow-xl rounded-2xl",
            headerTitle: "text-foreground text-2xl font-bold",
            headerSubtitle: "text-muted-foreground",
            formButtonPrimary:
              "bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold",
            formFieldInput:
              "w-full rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring",
            formFieldLabel: "text-sm font-medium text-foreground",
            footerActionLink: "text-primary font-semibold hover:underline",
            dividerLine: "bg-border",
            dividerText: "text-muted-foreground",
            socialButtonsBlockButton:
              "border border-border bg-background hover:bg-muted rounded-lg",
            socialButtonsBlockButtonText: "text-foreground font-medium",
            identityPreviewText: "text-foreground",
            identityPreviewEditButton: "text-primary",
          },
        }}
      />
    </div>
  );
}
