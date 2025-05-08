import { Router } from "express";
import {
  createFaq,
  createFaqItem,
  deleteFaq,
  deleteFaqItem,
  getAllFaqs,
  getFaqById,
  getFaqByType,
  getFaqItemsByFaqId,
  updateFaq,
  updateFaqItem,
  updateFaqItemPosition,
} from "./faq.controllers";
import { validate } from "../../midleware/validate";
import { faqSchema } from "./faq.zod";
import auth from "../../midleware/authMidleware";

const router = Router();

router.post("/faq", auth("ADMIN", "MODARATOR"), validate(faqSchema), createFaq);
router.patch("/faq/:id", auth("ADMIN", "MODARATOR"), updateFaq);
router.get("/faq", getAllFaqs);
router.get("/faq:id", getFaqById);
router.get("/faq/type/:type", getFaqByType);
router.delete("/faq/:id", auth("ADMIN", "MODARATOR"), deleteFaq);
router.post("/faqitem/", auth("ADMIN", "MODARATOR"), createFaqItem); // POST /faq-items
router.patch("/faqitem/:id", auth("ADMIN", "MODARATOR"), updateFaqItem); // PATCH /faq-items/:id
router.put(
  "/faqitem/positions",
  auth("ADMIN", "MODARATOR"),
  updateFaqItemPosition,
);
router.delete("/faqitem/:id", auth("ADMIN", "MODARATOR"), deleteFaqItem); // DELETE /faq-items/:id
router.get("/faqitem/:faqId", getFaqItemsByFaqId);
export default router;
