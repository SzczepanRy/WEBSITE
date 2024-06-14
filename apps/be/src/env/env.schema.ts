import * as z from "zod";

export const ENV_SCHEMA = z.object(
    {
        HOST_DB:z.string(),
        PORT_DB:z.coerce.number(),
        USER_DB:z.string(),
        USER_PASSWORD_DB:z.string(),
        NAME_DB:z.string(),
        AUTH_KEY:z.string(),
    }
).readonly();


export type Env = z.infer<typeof ENV_SCHEMA>

