import { Typography } from "@ui";
import { LinkCard } from "./link-card";
import { ButtonDownloadCSV } from "./button-download-csv";

export function MyLinks() {
  const linkMocks = [
    {
      id: "8aea8803-3f45-4140-a8ea-a330cee12a70",
      originalUrl: "https://www.rocketseat.com.br",
      shortUrl: "rocketseat-6",
      accessCount: 5000,
      createdAt: "2026-07-29T17:59:33.813Z",
    },
    {
      id: "00c0c778-48f5-47bc-8680-bb31cccdae22",
      originalUrl: "https://www.rocketseat.com.br",
      shortUrl: "rocketseat-5",
      accessCount: 20,
      createdAt: "2026-07-29T17:59:30.810Z",
    },
    {
      id: "3b7ca668-001a-4173-bfc6-b20677336143",
      originalUrl: "https://www.rocketseat.com.br",
      shortUrl: "rocketseat-4",
      accessCount: 1,
      createdAt: "2026-07-29T17:59:20.436Z",
    },
    {
      id: "e228674d-486d-4668-9543-3956c196af14",
      originalUrl: "https://www.rocketseat.com.br",
      shortUrl: "rocketseat-3",
      accessCount: 0,
      createdAt: "2026-07-29T17:59:17.501Z",
    },
    {
      id: "e646b78b-b380-4566-840c-b4828x804528",
      originalUrl: "https://www.rocketseat.com.br",
      shortUrl: "rocketseat-2",
      accessCount: 0,
      createdAt: "2026-07-29T17:59:14.555Z",
    },
    {
      id: "e646b78b-b380-4566-840c-b48287804528",
      originalUrl: "https://www.rocketseat.com.br",
      shortUrl: "rocketseat-2",
      accessCount: 0,
      createdAt: "2026-07-29T17:59:14.555Z",
    },
    {
      id: "e646b78b-b380-4566-840c-b48289804528",
      originalUrl: "https://www.rocketseat.com.br",
      shortUrl: "rocketseat-2",
      accessCount: 0,
      createdAt: "2026-07-29T17:59:14.555Z",
    },
    {
      id: "e646b78b-b380-4566-840c-b48f89804528",
      originalUrl: "https://www.rocketseat.com.br",
      shortUrl: "rocketseat-2",
      accessCount: 0,
      createdAt: "2026-07-29T17:59:14.555Z",
    },
    {
      id: "e646b78b-b380-4566-840c-b482s9804528",
      originalUrl: "https://www.rocketseat.com.br",
      shortUrl: "rocketseat-2",
      accessCount: 0,
      createdAt: "2026-07-29T17:59:14.555Z",
    },
    {
      id: "e646b78b-b380-4566-840c-b48286804528",
      originalUrl: "https://www.rocketseat.com.br",
      shortUrl: "rocketseat-2",
      accessCount: 0,
      createdAt: "2026-07-29T17:59:14.555Z",
    },
    {
      id: "e646b78b-b380-4566-840c-b48289804428",
      originalUrl: "https://www.rocketseat.com.br",
      shortUrl: "rocketseat-2",
      accessCount: 0,
      createdAt: "2026-07-29T17:59:14.555Z",
    },
  ];

  return (
    <div className="flex w-full min-w-0 flex-col rounded-lg bg-gray-100 p-8 lg:flex-1">
      <section className="flex shrink-0 items-center justify-between">
        <Typography variant="lg" as="h2" className="select-none">
          Meus links
        </Typography>

        <ButtonDownloadCSV />
      </section>

      <ul className="mt-6 max-h-125 divide-y divide-y-reverse divide-gray-200 overflow-auto pr-1">
        {linkMocks.map((item) => (
          <LinkCard
            key={item.id}
            accessCount={item.accessCount}
            shortUrl={item.shortUrl}
            originalUrl={item.originalUrl}
          />
        ))}
      </ul>
    </div>
  );
}
