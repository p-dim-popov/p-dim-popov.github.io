import { createLink } from "@tanstack/react-router";
import { TextLink } from "#platform/design-system";

/**
 * `design-system`'s text link, navigating through the router. Every link to a page of the Site
 * uses it, so no module wraps `TextLink` again.
 */
export const RouterTextLink = createLink(TextLink);
