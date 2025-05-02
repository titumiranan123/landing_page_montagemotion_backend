import { Router } from "express";
import { createFaq, createFaqItem, deleteFaq, deleteFaqItem, getAllFaqs, getFaqById, getFaqByType, getFaqItemsByFaqId, updateFaq, updateFaqItem, updateFaqItemPosition } from "./faq.controllers";
import { validate } from "../../midleware/validate";
import { faqSchema } from "./faq.zod";
import auth from "../../midleware/authMidleware";


const router = Router();

router.post("/faq",validate(faqSchema),auth('ADMIN') ,createFaq);
router.patch("/faq/:id", updateFaq);
router.get("/faq", getAllFaqs);
router.get("/faq:id", getFaqById);
router.get("/faq/type/:type", getFaqByType);
router.delete("/faq/:id", deleteFaq);
router.post("/faqitem/", createFaqItem);          // POST /faq-items
router.patch("/faqitem/:id", updateFaqItem);       // PATCH /faq-items/:id
router.put("/faqitem/positions", updateFaqItemPosition);       // PATCH /faq-items/:id
router.delete("/faqitem/:id", deleteFaqItem);      // DELETE /faq-items/:id
router.get("/faqitem/:faqId", getFaqItemsByFaqId);
export default router;
