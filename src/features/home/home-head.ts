import { OWNER_NAME, pageHead } from "#platform/site";

/** Home's head. Home has no title of its own, so its title is the owner's name. */
export function homeHead() {
	return pageHead({
		description: `The personal Site of ${OWNER_NAME}.`,
		path: "/",
	});
}
