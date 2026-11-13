import type { NavEntry } from "#platform/site";
import { BLOG_INDEX_PATH } from "./blog-paths";

/** The Blog's entry in the Site's nav. */
export const blogNavEntry: NavEntry = { label: "Blog", to: BLOG_INDEX_PATH };
