import { Database } from "./database.types";

// Extract the Profile type from the database types
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

// Re-export database types
export type { Database };