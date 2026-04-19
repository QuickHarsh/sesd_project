import bcrypt from "bcryptjs";
import { AppError } from "../errors/AppError.js";
import { signToken } from "../utils/token.js";

export class AuthService {
  constructor(userRepository, appConfig) {
    this.userRepository = userRepository;
    this.appConfig = appConfig;
  }

  #normalizeEmail(email) {
    return String(email || "")
      .toLowerCase()
      .trim();
  }

  async register(payload) {
    const name = String(payload.name || "").trim();
    const email = this.#normalizeEmail(payload.email);
    const password = String(payload.password || "");

    if (name.length < 2) {
      throw new AppError("Name should be at least 2 characters.", 400);
    }

    if (!email || !email.includes("@")) {
      throw new AppError("A valid email is required.", 400);
    }

    if (password.length < 6) {
      throw new AppError("Password should be at least 6 characters.", 400);
    }

    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new AppError("Email is already registered.", 409);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.userRepository.create({
      name,
      email,
      passwordHash,
    });

    return this.#buildAuthResponse(user);
  }

  async login(payload) {
    const email = this.#normalizeEmail(payload.email);
    const password = String(payload.password || "");

    if (!email || !password) {
      throw new AppError("Email and password are required.", 400);
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Invalid email or password.", 401);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new AppError("Invalid email or password.", 401);
    }

    return this.#buildAuthResponse(user);
  }

  async getProfile(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found.", 404);
    }

    return {
      id: String(user._id),
      name: user.name,
      email: user.email,
    };
  }

  #buildAuthResponse(user) {
    const token = signToken(
      {
        sub: String(user._id),
        email: user.email,
      },
      this.appConfig.JWT_SECRET,
      this.appConfig.JWT_EXPIRES_IN,
    );

    return {
      token,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
      },
    };
  }
}
