import { Typography } from "@ui";
import { ButtonDownloadCSV } from "./button-download-csv";

interface MyLinksHeaderProps {
  isUnavailable: boolean;
}
export function MyLinksHeader({ isUnavailable }: MyLinksHeaderProps) {
  return (
    <section className="flex shrink-0 items-center justify-between">
      <Typography variant="lg" as="h2">
        Meus links
      </Typography>

      <ButtonDownloadCSV isUnavailable={isUnavailable} />
    </section>
  );
}
