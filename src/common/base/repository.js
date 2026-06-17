export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findMany(params) {
    return this.model.findMany(params);
  }

  async findById(id) {
    return this.model.findUnique({
      where: { id },
    });
  }

  async create(data) {
    return this.model.create({
      data,
    });
  }

  async update(id, data) {
    return this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return this.model.delete({
      where: { id },
    });
  }

  async count(where) {
    return this.model.count({
      where,
    });
  }
}