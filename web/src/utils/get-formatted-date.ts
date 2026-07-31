interface FormatDateInSaoPauloProps {
  isoString?: string | undefined;
  withTime: boolean;
}

export function formatDateInSaoPaulo({
  isoString = undefined,
  withTime = false,
}: FormatDateInSaoPauloProps): string {
  const date = isoString ? new Date(isoString) : new Date();

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    ...(withTime && {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  };

  const formatted = new Intl.DateTimeFormat("pt-BR", options).format(date);
  return formatted.replace(/\//g, "-");
}
