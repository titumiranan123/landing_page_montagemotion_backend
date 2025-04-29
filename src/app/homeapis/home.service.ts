import { db } from "../../db/db"

export const homeapiServices = {
    async advertsingService (type:string){
        const headerService = await db.query(`SELECT * FROM headers WHERE type = $1 `,[type])
        const worksService = await db.query(`SELECT * FROM Works WHERE type = $1 `,[type])
        const testimonialService = await db.query(`SELECT * FROM testimonials WHERE type = $1 `,[type])
        const faqService = await db.query(`SELECT * FROM faqs WHERE type = $1 `,[type])
    }
}