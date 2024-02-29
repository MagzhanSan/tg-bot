export const formatDate = (dateString: string) => {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}
	return new Date(dateString).toLocaleDateString('ru-RU', options)
}
