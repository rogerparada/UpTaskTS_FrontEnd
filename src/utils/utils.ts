export function formatDate(isoString: string): string {
	const newDate = new Date(isoString);
	const formatter = Intl.DateTimeFormat("es-ES", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return formatter.format(newDate);
}
