import { Logger } from "winston";
import { Page } from "@playwright/test";

export const fixture = {
    // @ts-ignore
    page: undefined as Page,
    logger: undefined as Logger
}
