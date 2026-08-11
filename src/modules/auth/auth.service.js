import * as userRepository
from "../user/user.repository.js";

import businessRepository
from "../user/business.repository.js";

import  businessMemberRepository
from "../user/business-member.repository.js";

import {
  comparePassword
}
from "../../common/helpers/password.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
}
from "../../common/helpers/jwt.js";

import { AppError }
from "../../common/middlewares/error.js";

export const login = async (
    username,
    password
) => {

  const user = await userRepository.findByUsername(
    username
  );

  const business = await businessRepository.findById(
    user.businessId
  );

  if (!user) {
    throw new AppError(
      "Invalid Credentials",
      401
    );
  }

  const valid = await comparePassword(
    password,
    user.password
  );

  if (!valid) {
    throw new AppError(
      "Invalid Credentials",
      401
    );
  }
  
  const payload = {
    userId: user.id,
    username: user.username,
    businessId: user.businessId,
  };

  const accessToken = generateAccessToken(
    payload
  );

  const refreshToken = generateRefreshToken(
    payload
  );

  const isSuperUser = user.UserBusinessMember.some(
    (item) =>
      item.Role.code === "BA" ||
      item.Role.code === "CR"
  );

  let businessMembers = [];

  if (isSuperUser) {

    const members = await businessMemberRepository.findMany({
      where: {
        businessId: user.businessId,
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    businessMembers = members.map(
      (item) => ({
        businessMemberId: item.id,
        name: item.name,
        roleId: null,
        roleCode: "BA",
        roleName: "Business Administrator",
      })
    );

  } else {

    businessMembers = user.UserBusinessMember.map(
      (item) => ({
        businessMemberId: item.businessMemberId,
        name: item.BusinessMember.name,
        roleId: item.roleId,
        roleCode: item.Role.code,
        roleName: item.Role.name,
      })
    );
  }

  return {
    userId: user.id,
    username: user.username,
    accessToken,
    refreshToken,
    businessId: user.businessId,
    businessName: business.name,
    businessMembers
  };
};

export const refreshToken =
  async (refreshToken) => {

  const session = await prisma.userSession.findFirst({
    where: {
      refreshToken,
    },
  });

  if (!session) {
    throw new AppError(
      "Invalid refresh token",
      401
    );
  }

  const payload = verifyRefreshToken(
    refreshToken
  );

  const accessToken = generateAccessToken({
    userId: payload.userId,
    username: payload.username,
    businessId: payload.businessId,
  });

  return {
    accessToken,
  };
};

export const logout = async (
  refreshToken
) => {

  await prisma.userSession.deleteMany({
    where: {
      refreshToken,
    },
  });

  return true;
};

export const changePassword = async (
  userId,
  oldPassword,
  newPassword
) => {

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const valid = await comparePassword(
    oldPassword,
    user.password
  );

  if (!valid) {
    throw new AppError(
      "Old password is incorrect",
      400
    );
  }

  await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      password:
        await hashPassword(
          newPassword
        ),
    },
  });

  return true;
};