import { container } from "tsyringe";
import { Logger } from "./logger/Logger";
import { LoggingStrategy } from "./logger/LoggingStrategy";
import {WinstonLoggerStrategy} from "./logger/WinstonLoggerStrategy";
import {LOG_DEBUG, LOG_ERROR, LOG_INFO, LOGGING} from "./config";
import {EventNotificationController} from "../api/controller/EventNotificationController";
import "reflect-metadata";

// ? Register all dependencies
container.register<LoggingStrategy>("LoggingStrategy", { useClass: WinstonLoggerStrategy});
container.register<boolean>("logging", {useValue: (LOGGING === "true") });
container.register<boolean>("logDebug", {useValue: (LOG_DEBUG === "true") });
container.register<boolean>("logError", {useValue: (LOG_ERROR === "true") });
container.register<boolean>("logInfo", {useValue: (LOG_INFO === "true") });

// ? Get instances
export const logger = container.resolve(Logger);
export const eventNotificationController = container.resolve(EventNotificationController);