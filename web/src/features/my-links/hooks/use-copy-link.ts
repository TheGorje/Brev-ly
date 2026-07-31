export function useCopyLink() {
  async function copyLink(url: string) {
    try {
      await navigator.clipboard.writeText(url);

      return true;
    } catch {
      return false;
    }
  }

  return {
    copyLink,
  };
}
