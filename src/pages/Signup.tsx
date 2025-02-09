
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError, AuthChangeEvent } from "@supabase/supabase-js";
import ScheduleMeeting from "@/components/meetings/ScheduleMeeting";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent) => {
      switch (event) {
        case "SIGNED_UP":
          toast.success("Account created successfully! Please check your email to verify your account.");
          break;
        case "SIGNED_IN":
          toast.success("Successfully signed in! Welcome aboard! 🚀");
          navigate("/");
          break;
        case "USER_UPDATED":
          toast.success("Email verified successfully!");
          navigate("/");
          break;
        case "SIGNED_OUT":
          setError(null);
          break;
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
          <h1 className="text-2xl font-bold text-center mb-6">Create Account ✨</h1>
          
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
            view="sign_up"
            showLinks={true}
            theme="light"
            redirectTo={window.location.origin}
          />
          <div className="mt-6">
            <ScheduleMeeting />
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href="https://docs.startup-spark-hub.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-white text-purple-700 rounded-lg shadow-lg hover:bg-purple-50 transition-colors"
          >
            Resources
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
