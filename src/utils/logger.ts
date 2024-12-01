export function logWithTimestamp(message: string) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

export function errorWithTimestamp(message: string) {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ${message}`);
}
