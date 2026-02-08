// Simple password-based auth for admin
// In production, use Supabase Auth or NextAuth

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export function isValidPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function hashPassword(password: string): string {
  // Simple hash for demo - use bcrypt in production
  return Buffer.from(password).toString('base64');
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}
