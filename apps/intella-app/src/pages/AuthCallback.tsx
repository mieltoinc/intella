import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";



const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');
  const accessToken = searchParams.get('access_token');

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hasError = searchParams.get('error');
    if (hasError) {
      setError(searchParams.get('error_description') || 'An unexpected authentication error occurred')
    }
  }, [searchParams])

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        let supabaseAuthResponse: any
        if (code) {
          supabaseAuthResponse = await supabase.auth.exchangeCodeForSession(code);
        } else {
          supabaseAuthResponse = await supabase.auth.getSession()
        }
        const { data, error } = supabaseAuthResponse

        if (error) {
          setError(error.message)
          setTimeout(() => navigate('/auth'), 4000)
          return
        }

        if (data.session) {
          // Successful authentication
          setTimeout(() => navigate('/'), 6000)
        } else {
          // No session found
          navigate('/auth')
        }
      } catch (err) {
        setError('An unexpected error occurred')
        setTimeout(() => navigate('/auth'), 4000)
      }
    }

    handleAuthCallback()
  }, [navigate])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">Authentication Error</div>
          <div className="text-gray-600 dark:text-white mb-4">{error}</div>
          <div className="text-sm text-gray-500 dark:text-white">Redirecting to login...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-900 dark:text-white" />
        <div className="text-gray-600 dark:text-white text-lg">Completing authentication...</div>
      </div>
    </div>
  )
};

export default AuthCallback;