// Shim for generated Supabase Database types to satisfy TS in legacy client
// We are not using Supabase runtime, but this avoids typecheck failures.
export type Database = unknown;
