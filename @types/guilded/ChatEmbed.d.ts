import { dateTimeString, mediaUriString, uriString, webhookMarkdownString } from "./common";

export type ChatEmbed = {
  /** Main header of the embed (max length 256) */
  title?: webhookMarkdownString;
  /** Subtext of the embed (max length 2048) */
  description?: webhookMarkdownString;
  /** URL to linkify the title field with (max length 1024; regex ^(?!attachment)) */
  url?: uriString;
  /** Decimal value of the color that the left border should be (min 0; max 16777215) */
  color?: number;
  /** A small section at the bottom of the embed */
  footer?: {
    /** URL of a small image to put in the footer */
    icon_url?: mediaUriString;
    /**
Text of the footer */
    text: string;
  };
  /**
A timestamp to put in the footer */
  timestamp?: dateTimeString;
  /** An image to the right of the embed's content */
  thumbnail?: {
    /** URL of the image */
    url?: mediaUriString;
  };
  /** The main picture to associate with the embed */
  image?: {
    /** URL of the image */
    url?: mediaUriString;
  };
  /** A small section above the title of the embed */
  author?: {
    /** Name of the author */
    name?: string;
    /** URL to linkify the author's name field */
    url?: uriString;
    /**
URL of a small image to display to the left of the author's name */
    icon_url?: mediaUriString;
  };
  /** Table-like cells to add to the embed (max items 25) */
  fileds?: {
    /** Header of the table-like cell (max length 256) */
    name: webhookMarkdownString;
    /** Subtext of the table-like cell (max length 1024) */
    value: webhookMarkdownString;
    /** If the field should wrap or not (default false) */
    inline?: boolean;
  }[];
};
