import prisma 
from "../../common/constants/prisma.js";

import { BaseRepository } from "../../common/base/repository.js";

export default new BaseRepository(
  prisma.user
);

export const findByUsername =
  async (username) => {

    return prisma.user.findFirst({
      where: {
        username,
        isActive: true,
      },
      include: {
        UserBusinessMember: {
          include: {
            BusinessMember: true,
            Role: true,
          },
        },
      },
    });

  };