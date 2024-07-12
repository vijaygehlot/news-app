

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: '2-digit', year: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};


export function transformString(input: string) {
  return input
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' - ');
}