import * as z from "zod";

import { db } from '../../db'
import { WithId } from "mongodb";

export const Company = z.object({
    companyName: z.string().min(1),
    legalNumber: z.number(),
    country: z.string(),
});

export default Company;

export type Company = z.infer<typeof Company>;
export type CompanyWithId = WithId<Company>;
export const Companies = db.collection<Company>('companies');