//Format dates for rankings
export const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const formatted = date.toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).replace(', ', ' ').replace(/ [AP]M/, (match) => match.toLowerCase());

      return formatted
}