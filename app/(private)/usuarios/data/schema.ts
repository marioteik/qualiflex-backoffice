import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  // app_metadata: z.any(), // You need to define the zod schema for UserAppMetadata
  // user_metadata: z.any(), // You need to define the zod schema for UserMetadata
  // aud: z.string(),
  // confirmation_sent_at: z.string().optional(),
  // recovery_sent_at: z.string().optional(),
  // email_change_sent_at: z.string().optional(),
  // new_email: z.string().optional(),
  // new_phone: z.string().optional(),
  // invited_at: z.string().optional(),
  // action_link: z.string().optional(),
  // email: z.string().optional(),
  // phone: z.string().optional(),
  // created_at: z.string(),
  // confirmed_at: z.string().optional(),
  // email_confirmed_at: z.string().optional(),
  // phone_confirmed_at: z.string().optional(),
  // last_sign_in_at: z.string().optional(),
  // role: z.string().optional(),
  // updated_at: z.string().optional(),
  // identities: z.array(z.any()).optional(), // You need to define the zod schema for UserIdentity
  // is_anonymous: z.boolean().optional(),
  // factors: z.array(z.any()).optional(), // You need to define the zod schema for Factor
  // tasks
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  avatar: z.string(),
  email: z.string(),
  name: z.string(),
});

export type User = z.infer<typeof userSchema>;
