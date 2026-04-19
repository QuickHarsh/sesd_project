import { Link, NavLink, Outlet } from "react-router-dom";

export function AppLayout({ user, onLogout }) {
  return (
    <div className="app-shell">
      <header className="top-nav">
        <Link to="/" className="brand">
          SpendSmart
        </Link>
        <nav>
          <NavLink to="/" end>
            Dashboard
          </NavLink>
          <NavLink to="/history">History</NavLink>
        </nav>
        <div className="user-nav">
          <span>{user?.name || user?.email}</span>
          <button type="button" className="ghost-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
