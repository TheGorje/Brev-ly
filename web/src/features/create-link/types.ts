export interface CreateLinkBody {
  originalUrl: string;
  shortUrl: string;
}

export interface CreateLinkResponse {
  id: string;
  originalUrl: string;
  shortUrl: string;
}
