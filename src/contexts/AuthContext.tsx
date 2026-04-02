import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import bcrypt from "bcryptjs";
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "hm_auth_user";
const BCRYPT_ROUNDS = 10;

export interface AppUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const isAdmin = user?.role === "admin";

  // Restore session from localStorage on boot
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {
      localStorage.removeItem(SESSION_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const persist = (u: AppUser) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    setUser(u);
  };

  // ── Sign Up ───────────────────────────────────────────────────────────────
  const signUp = async (
    email: string,
    password: string,
    fullName: string
  ): Promise<{ error: string | null }> => {
    try {
      const cleanEmail = email.toLowerCase().trim();

      // 1. Check if email already exists
      const { data: existing } = await supabase
        .from("custom_users")
        .select("id")
        .eq("email", cleanEmail)
        .maybeSingle();

      if (existing) {
        return { error: "Email already registered. Please sign in." };
      }

      // 2. Hash password
      const hashed = await bcrypt.hash(password, BCRYPT_ROUNDS);

      // 3. Insert user
      const { data: newUser, error: insertError } = await supabase
        .from("custom_users")
        .insert({
          email: cleanEmail,
          password: hashed,
          full_name: fullName.trim(),
          role: "user",
        })
        .select("id, email, full_name, role")
        .single();

      if (insertError || !newUser) {
        console.error("[signUp] insert error:", insertError);
        return { error: insertError?.message ?? "Failed to create account." };
      }

      // 4. Auto sign-in — no extra step needed
      persist({
        id: newUser.id,
        email: newUser.email,
        full_name: newUser.full_name,
        role: newUser.role,
      });

      return { error: null };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[signUp] unexpected error:", msg);
      return { error: msg };
    }
  };

  // ── Sign In ───────────────────────────────────────────────────────────────
  const signIn = async (
    email: string,
    password: string
  ): Promise<{ error: string | null }> => {
    try {
      const cleanEmail = email.toLowerCase().trim();

      const { data: found, error: fetchError } = await supabase
        .from("custom_users")
        .select("id, email, full_name, role, password")
        .eq("email", cleanEmail)
        .maybeSingle();

      if (fetchError || !found) {
        return { error: "No account found with this email." };
      }

      const match = await bcrypt.compare(password, found.password);
      if (!match) return { error: "Incorrect password." };

      persist({
        id: found.id,
        email: found.email,
        full_name: found.full_name,
        role: found.role,
      });

      return { error: null };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[signIn] unexpected error:", msg);
      return { error: msg };
    }
  };

  // ── Sign Out ──────────────────────────────────────────────────────────────
  const signOut = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};