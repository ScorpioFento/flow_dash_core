import { SetMetadata } from "@nestjs/common";
import { PermissionEnum } from "src/utils/access_permissions";

export const PERMISSION_KEY = "permissions";
export const RequirePermissions = (...permissions : PermissionEnum[]) => SetMetadata(PERMISSION_KEY, permissions)