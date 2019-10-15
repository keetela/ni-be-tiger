import { Router } from "express";
import UserController from "../../controllers/UserController";
import verifyToken from "../../middlewares/verifyToken";
import validateUser from "../../middlewares/validateUser";
import checkUpdateUserPermission from "../../middlewares/checkUpdateUserPermission";
import asyncHandler from "../../middlewares/asyncHandler";
import AuthLocalController from "../../controllers/AuthLocalController";
import isActiveUser from "../../middlewares/isActiveUser";
import verifyAdmin from "../../middlewares/verifyAdmin";
import checkUpdateUser from "../../middlewares/checkUpdateUser";
import checkSignUpPermission from "../../middlewares/checkSignUpPermission";

const router = Router();

router.put(
  "/",
  verifyToken,
  checkUpdateUserPermission,
  validateUser,
  checkUpdateUser,
  UserController.update
); // update user profile

router.get(
  "/username/:username",
  // verifyToken,
  // checkUpdateUserPermission,
  UserController.getAllByUsername
);
router.get(
  "/email/confirm/:token",
  verifyToken,
  UserController.confirmEmailUpdate
); // confirm email update
router.get(
  "/all",
  verifyToken,
  verifyAdmin,
  asyncHandler(UserController.getAll)
);
router.put(
  "/:id",
  verifyToken,
  validateUser,
  isActiveUser,
  checkUpdateUserPermission,
  checkUpdateUser,
  UserController.update
); // update user profile by id

router.delete(
  "/:id",
  verifyToken,
  checkUpdateUserPermission,
  isActiveUser,
  AuthLocalController.deactivateAccount
);

router.get(
  "/:id",
  verifyToken,
  verifyAdmin,
  checkUpdateUserPermission,
  AuthLocalController.getOne
);
router.post(
  "/",
  verifyToken,
  verifyAdmin,
  validateUser,
  checkSignUpPermission,
  AuthLocalController.create
);
router.patch(
  "/:username/follow",
  verifyToken,
  isActiveUser,
  UserController.follow
);
export default router;
