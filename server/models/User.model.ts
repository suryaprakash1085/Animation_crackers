import db from "../db";
import bcrypt from "bcryptjs";

const table = () => db("users");

export const UserModel = {
  async findAll(filters: { search?: string; role?: string } = {}) {
    let query = table().select("id", "name", "email", "role", "created_at");
    if (filters.search) query = query.where("email", "like", `%${filters.search}%`);
    if (filters.role) query = query.andWhere("role", filters.role);
    return query.orderBy("id", "desc");
  },

  async findById(id: number) {
    return table().where({ id }).select("id", "name", "email", "role", "created_at").first();
  },

  async findByEmail(email: string) {
    return table().where({ email }).first();
  },

  async create(data: { name?: string; email: string; password: string; role?: "admin" | "customer" }) {
    const hashed = bcrypt.hashSync(data.password, 10);
    const [id] = await table().insert({
      name: data.name || null,
      email: data.email,
      password: hashed,
      role: data.role || "customer",
    });
    return this.findById(id);
  },

  async update(id: number, data: Partial<{ name: string; email: string; role: "admin" | "customer" }>) {
    await table()
      .where({ id })
      .update({ ...data, updated_at: db.fn.now() });
    return this.findById(id);
  },

  async remove(id: number) {
    return table().where({ id }).del();
  },

  verifyPassword(plain: string, hashed: string) {
    return bcrypt.compareSync(plain, hashed);
  },
};
