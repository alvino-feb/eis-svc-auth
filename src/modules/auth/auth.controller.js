import * as service
from "./auth.service.js";

import {
  successResponse
}
from "../../common/helpers/response.js";

export const login =
  async (
    req,
    res,
    next
  ) => {

  try {

    const result =
      await service.login(
        req.body.username,
        req.body.password
      );

    return successResponse(
      res,
      result,
      "Login successful"
    );

  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (
  req,
  res,
  next
) => {
  try {

    const result =
      await service.refreshToken(
        req.body.refreshToken
      );

    return successResponse(
      res,
      result,
      "New Token"
    );

  } catch (err) {
    next(err);
  }
};

export const logout =
  async (
    req,
    res,
    next
  ) => {

  try {

    const result =
      await service.logout(
        req.body.username
      );

    return successResponse(
      res,
      result,
      "Logout successful"
    );

  } catch (err) {
    next(err);
  }
};