export class UserRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async findByEmail(email) {
    return this.userModel.findOne({ email: email.toLowerCase().trim() }).lean();
  }

  async findById(id) {
    return this.userModel.findById(id).lean();
  }

  async create(userData) {
    const user = await this.userModel.create(userData);
    return user.toObject();
  }
}
