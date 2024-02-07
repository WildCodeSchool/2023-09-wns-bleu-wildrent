export default function getApiUrl() {
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:4001/'
    : process.env.NEXT_PUBLIC_API_URL_PROD;
}
