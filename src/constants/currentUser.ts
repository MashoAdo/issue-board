import { PERMISSIONS } from "../helpers/permissions";

const currentUser = {
	name: "Alice",
	role: "admin",
};

export default currentUser;

export const adminPermissions = [
	PERMISSIONS.MOVE_ISSUE,
	PERMISSIONS.UPDATE_STATUS,
	PERMISSIONS.MARK_AS_RESOLVED,
	PERMISSIONS.VIEW_ISSUE,
];

export const contributorPermissions = [PERMISSIONS.VIEW_ISSUE];
