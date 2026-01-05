import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseHelper } from '@/integrations/supabase/helper';
import { AuthContextType } from '@/types/auth.types';
import { User, Provider } from '@supabase/supabase-js';


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children, auth }: { children: ReactNode, auth?: AuthContextType }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in on initial load
        const checkAuth = async () => {
            setLoading(true);

            const session = await supabaseHelper.getSession();
            if (session.session) {
                setUser(session.session.user);
            } else {
                setUser(null);
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

   

    const authContext = useMemo(
        () => ({
            signIn: async (data: { email: string, password: string }) => {
                const signinResponse = await supabaseHelper.signIn(data.email, data.password);
                if (signinResponse.error) {
                    throw signinResponse.error;
                }
                if (signinResponse.data.user) {
                    setUser(signinResponse.data.user);
                }
                if (!signinResponse.data.session) {
                    throw new Error('No session returned from sign in');
                }
                return signinResponse.data.session;
            },
            signInWithOAuth: async (provider: Provider) => {
                const signinResponse = await supabaseHelper.signInWithOAuth(provider);
                if (signinResponse.error) {
                    throw signinResponse.error;
                }
                // OAuth redirects, so we don't get a session immediately
                // The session will be available after the OAuth callback
                // This function returns void since it redirects the user
            },
            signUp: async (data: Record<string, any>) => {
                const signupResponse = await supabaseHelper.signUp(data.email, data.password);
                if (signupResponse.error) {
                    throw signupResponse.error;
                }
                if (signupResponse.data.user) {
                    setUser(signupResponse.data.user);
                }
                if (!signupResponse.data.session) {
                    throw new Error('No session returned from sign up');
                }
                return signupResponse.data.session;
            },
            checkAuthStatus: async () => {
                const sessionResponse = await supabaseHelper.getSession();
                if (sessionResponse.error) {
                    throw sessionResponse.error;
                }
                if (!sessionResponse.session) {
                    throw new Error('No session available');
                }
                return sessionResponse.session;
            },
            signOut: async () => {
                await supabaseHelper.signOut();
                setUser(null);
                navigate('/auth');
            },
            forgotPassword: async (data: Record<string, any>) => {
                const forgotPasswordResponse = await supabaseHelper.resetPassword(data.email);
                return forgotPasswordResponse;
            },
            getProfile: async () => {

                let supabaseUser = user;

                if (!supabaseUser) {

                    const profileResponse = await supabaseHelper.getCurrentUser();
                    if (profileResponse.error) {
                        throw profileResponse.error;
                    }
                    supabaseUser = profileResponse.user;
                }

                return {
                    id: supabaseUser?.id,
                    name: supabaseUser?.user_metadata.name ?? supabaseUser?.user_metadata.full_name ?? supabaseUser?.email,
                    email: supabaseUser?.email,
                    avatar_url: supabaseUser?.user_metadata.avatar_url ?? supabaseUser?.user_metadata.picture,
                }
                
            }
        }),
        [auth, navigate]
    );

    const value = {
        user,
        isAuthenticated: !!user,
        loading,
        ...authContext
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
