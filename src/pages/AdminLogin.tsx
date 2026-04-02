import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await signIn(email, password);

    if (error) {
      alert("Login failed");
      return;
    }

    // wait a bit for role check
    setTimeout(() => {
      navigate("/admin");
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 border rounded-md w-80">
        <h2 className="text-xl mb-4">Admin Login</h2>
        <input
          placeholder="Email"
          className="w-full mb-2 p-2 border"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          className="w-full mb-4 p-2 border"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="w-full bg-black text-white p-2">
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;