import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError } from "@supabase/supabase-js";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        toast.success("Successfully signed in!");
        navigate("/");
      } else if (event === "PASSWORD_RECOVERY") {
        toast.info("Please check your email for password reset instructions.");
      } else if (event === "USER_UPDATED") {
        toast.success("Your password has been updated successfully!");
        navigate("/");
      } else if (event === "SIGNED_OUT") {
        setError(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setError("An error occurred while checking authentication status.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (error: AuthError) => {
    let message = "An error occurred during authentication.";
    
    switch (error.message) {
      case "Invalid login credentials":
        message = "Invalid email or password. Please try again.";
        break;
      case "Email not confirmed":
        message = "Please verify your email address before signing in.";
        break;
      case "User not found":
        message = "No account found with these credentials.";
        break;
      case "Too many requests":
        message = "Too many attempts. Please try again later.";
        break;
      default:
        message = error.message;
    }
    
    setError(message);
    toast.error(message);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900">
        <Header />
        <div className="container mx-auto px-4 pt-24">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl p-8">
            <p className="text-center">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900">
      <Header />
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Welcome Back! 👋</h1>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#6d28d9',
                    brandAccent: '#5b21b6',
                  },
                },
              },
            }}
            providers={[]}
            view="sign_in"
            showLinks={true}
            theme="light"
            magicLink={true}
            redirectTo={window.location.origin}
          />
        </div>

        <div className="mt-8 text-center text-white">
          <p className="text-sm">
            Need help? Contact support at{" "}
            <a href="mailto:support@startup-spark-hub.com" className="underline">
              support@startup-spark-hub.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;