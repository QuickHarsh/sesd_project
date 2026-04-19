import axios from "axios";

export class ExpenseApiService {
  constructor(baseURL) {
    this.client = axios.create({ baseURL });
    this.token = "";

    this.client.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });
  }

  setToken(token) {
    this.token = token;
  }

  async register(payload) {
    const { data } = await this.client.post("/auth/register", payload);
    return data;
  }

  async login(payload) {
    const { data } = await this.client.post("/auth/login", payload);
    return data;
  }

  async me() {
    const { data } = await this.client.get("/auth/me");
    return data;
  }

  async getExpenses(category) {
    const params = category ? { category } : {};
    const { data } = await this.client.get("/expenses", { params });
    return data;
  }

  async getDashboardSummary() {
    const { data } = await this.client.get("/dashboard/summary");
    return data;
  }

  async addExpense(payload) {
    const { data } = await this.client.post("/expenses", payload);
    return data;
  }

  async updateExpense(id, payload) {
    const { data } = await this.client.put(`/expenses/${id}`, payload);
    return data;
  }

  async deleteExpense(id) {
    const { data } = await this.client.delete(`/expenses/${id}`);
    return data;
  }
}
