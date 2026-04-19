import { useState } from "react";

const defaultRegisterForm = { name: "", email: "", password: "" };
const defaultLoginForm = { email: "", password: "" };

export function AuthPage({ authUseCase, onAuthenticated }) {
  const [mode, setMode] = useState("login");
  const [registerForm, setRegisterForm] = useState(defaultRegisterForm);
  const [loginForm, setLoginForm] = useState(defaultLoginForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const session = await authUseCase.login(loginForm);
      authUseCase.saveSession(session);
      onAuthenticated(session);
    } catch (loginError) {
      setError(
        loginError?.response?.data?.message ||
          loginError.message ||
          "Login failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const session = await authUseCase.register(registerForm);
      authUseCase.saveSession(session);
      onAuthenticated(session);
    } catch (registerError) {
      setError(
        registerError?.response?.data?.message ||
          registerError.message ||
          "Registration failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-screen">
      <article className="panel auth-card">
        <h1>SpendSmart</h1>
        <p>
          Securely track personal expenses with real user accounts and
          cloud-backed storage.
        </p>

        <div className="auth-switch">
          <button
            className={isLogin ? "primary-btn" : "ghost-btn"}
            type="button"
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={!isLogin ? "primary-btn" : "ghost-btn"}
            type="button"
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        {isLogin ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <label>
              Email
              <input
                type="email"
                value={loginForm.email}
                onChange={(event) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
                required
              />
            </label>
            <button className="primary-btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegister}>
            <label>
              Name
              <input
                type="text"
                value={registerForm.name}
                onChange={(event) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }))
                }
                minLength={2}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={registerForm.email}
                onChange={(event) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={registerForm.password}
                onChange={(event) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
                minLength={6}
                required
              />
            </label>
            <button className="primary-btn" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        )}

        {error ? <p className="error-text">{error}</p> : null}
      </article>
    </section>
  );
}
