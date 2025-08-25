declare global {
  interface Window {
    gtag(event: 'config', trackingId: string, config: { page_path: string }): void;
    gtag(event: 'js', date: Date): void;
  }
}
