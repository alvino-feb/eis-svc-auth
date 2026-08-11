import prisma 
from "../../common/constants/prisma.js";

import { BaseRepository } from "../../common/base/repository.js";

export default new BaseRepository(
  prisma.business
);