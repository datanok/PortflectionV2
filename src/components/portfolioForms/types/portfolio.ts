import { basePortfolioSchema, developerPortfolioSchema, designerPortfolioSchema, photographerPortfolioSchema, writerPortfolioSchema, managerPortfolioSchema } from "@/lib/zod";
import { z } from "zod";

export type PortfolioFormData = z.infer<typeof basePortfolioSchema>;
export type DeveloperPortfolioFormData = z.infer<typeof developerPortfolioSchema>;
export type DesignerPortfolioFormData = z.infer<typeof designerPortfolioSchema>;
export type PhotographerPortfolioFormData = z.infer<typeof photographerPortfolioSchema>;
export type WriterPortfolioFormData = z.infer<typeof writerPortfolioSchema>;
export type ManagerPortfolioFormData = z.infer<typeof managerPortfolioSchema>;
