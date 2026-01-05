import { User, Session, Provider} from "@supabase/supabase-js";

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    signIn: (data: Record<string, any>) => Promise<Session>;
    signUp: (data: Record<string, any>) => Promise<Session>;
    signInWithOAuth: (provider: Provider) => Promise<void>;
    checkAuthStatus: () => Promise<Session>;
    signOut: () => Promise<void>;
    loading: boolean;
}