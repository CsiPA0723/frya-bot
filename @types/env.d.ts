declare namespace NodeJS {
  export interface ProcessEnv {
    /** Guilded Auth Token */
    TOKEN: string;
    /** BOT ID */
    BOT_USER_ID: string;
    /** MAIN GUILD SERVER ID */
    MAIN_GUILD_ID: string;
  }
}
