

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {   month: 'long',day: '2-digit',year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  