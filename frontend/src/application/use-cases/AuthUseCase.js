export class AuthUseCase {
  constructor(expenseApiService) {
    this.expenseApiService = expenseApiService;
  }

  login(payload) {
    return this.expenseApiService.login(payload);
  }

  register(payload) {
    return this.expenseApiService.register(payload);
  }

  getProfile() {
    return this.expenseApiService.me();
  }

  saveSession(session) {
    localStorage.setItem("spendsmart_session", JSON.stringify(session));
    this.expenseApiService.setToken(session.token);
  }

  clearSession() {
    localStorage.removeItem("spendsmart_session");
    this.expenseApiService.setToken("");
  }

  restoreSession() {
    const raw = localStorage.getItem("spendsmart_session");
    if (!raw) {
      return null;
    }

    try {
      const session = JSON.parse(raw);
      if (!session?.token || !session?.user) {
        return null;
      }
      this.expenseApiService.setToken(session.token);
      return session;
    } catch {
      return null;
    }
  }
}
