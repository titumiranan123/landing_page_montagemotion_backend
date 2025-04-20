import { Router } from "express";
import { createFaq, deleteFaq, getAllFaqs, getFaqById, getFaqByType, updateFaq } from "./faq.controllers";


const router = Router();

router.post("/faq", createFaq);
router.patch("/faq/:id", updateFaq);
router.get("/faq", getAllFaqs);
router.get("/faq:id", getFaqById);
router.get("/faq/type/:type", getFaqByType);
router.delete("/faq/:id", deleteFaq);

export default router;
