import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        toast.success("Successfully signed in!");
        navigate("/");
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
          <h1 className="text-2xl font-bold text-center mb-6">Welcome Back! 👋</h1>
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
      </div>
    </div>
  );
};

export default Login;