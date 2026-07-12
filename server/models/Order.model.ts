import db from "../db";

const table = () => db("orders");

async function nextOrderNumber() {
  const last = await table().orderBy("id", "desc").first();
  const nextId = (last?.id || 0) + 1;
  return `ORD-${String(nextId).padStart(3, "0")}`;
}

export const OrderModel = {
  async findAll(filters: { search?: string; status?: string; from?: string; to?: string; category?: string } = {}) {
    let query = table().select("*");
    if (filters.search) {
      const q = filters.search;
      query = query.where((b) =>
        b.where("order_number", "like", `%${q}%`).orWhere("customer_name", "like", `%${q}%`).orWhere("phone", "like", `%${q}%`),
      );
    }
    if (filters.status) query = query.andWhere("status", filters.status);
    if (filters.category) query = query.andWhere("category", filters.category);
    if (filters.from) query = query.andWhere("order_date", ">=", filters.from);
    if (filters.to) query = query.andWhere("order_date", "<=", filters.to);
    return query.orderBy("id", "desc");
  },

  async findById(id: number) {
    return table().where({ id }).first();
  },

  async findByOrderNumber(orderNumber: string) {
    return table().where({ order_number: orderNumber }).first();
  },

  async create(data: {
    customer_name: string;
    phone: string;
    address?: string;
    category?: string;
    total: number;
    status?: string;
    order_date?: string;
  }) {
    const order_number = await nextOrderNumber();
    const [id] = await table().insert({
      order_number,
      customer_name: data.customer_name,
      phone: data.phone,
      address: data.address || null,
      category: data.category || null,
      total: data.total,
      status: data.status || "Pending",
      order_date: data.order_date || new Date().toISOString().slice(0, 10),
    });
    return this.findById(id);
  },

  async updateStatus(id: number, status: string) {
    await table().where({ id }).update({ status, updated_at: db.fn.now() });
    return this.findById(id);
  },

  async update(id: number, data: Partial<{ customer_name: string; phone: string; address: string; category: string; total: number; status: string }>) {
    await table()
      .where({ id })
      .update({ ...data, updated_at: db.fn.now() });
    return this.findById(id);
  },

  async remove(id: number) {
    return table().where({ id }).del();
  },
};
