import useGlobalStore from "../store/store";

export function authUserCan(permissions: TPermission[] | TPermission) {
	const authUserPerms = useGlobalStore.getState().authUserPermissions.permissions;

	if (Array.isArray(permissions)) {
		return permissions.some((perm) => authUserPerms.includes(perm));
	} else {
		return authUserPerms.includes(permissions);
	}
}

export const PERMISSIONS = {
	MOVE_ISSUE: "move_issue",
	UPDATE_STATUS: "update_status",
	MARK_AS_RESOLVED: "mark_as_resolved",
	VIEW_ISSUE: "view_issue",
} as const;

export type TPermission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
