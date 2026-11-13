const publishDateFormatter = new Intl.DateTimeFormat("en-GB", {
	dateStyle: "long",
	// Publish dates have no time of day. Formatting them in UTC gives the same text at build
	// time and in every visitor's time zone, so hydration matches.
	timeZone: "UTC",
});

/** A Post's publish date (`YYYY-MM-DD`), as "12 November 2026". */
export function PostDate({ date }: { date: string }) {
	return (
		<time dateTime={date}>{publishDateFormatter.format(new Date(date))}</time>
	);
}
