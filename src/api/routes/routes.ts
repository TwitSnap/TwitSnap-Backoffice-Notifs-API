import { Router } from "express";
import {eventNotificationController} from "../../utils/container";

const router = Router();

router.post("/v1/eventNotification", eventNotificationController.notifyEvent);

export default router;