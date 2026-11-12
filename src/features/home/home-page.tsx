import { Heading, Text } from "#platform/design-system";

export function HomePage() {
	return (
		<main className="mx-auto flex min-h-dvh max-w-measure flex-col justify-center gap-6 px-6 py-16">
			<Heading level={1} size="display">
				Petar Popov
			</Heading>
			<Text size="lead">
				This is the personal Site of Petar Popov. It is under construction.
			</Text>
		</main>
	);
}
