import { basePortfolioSchema, developerPortfolioSchema, designerPortfolioSchema, businessConsultingPortfolioSchema, contentCreatorPortfolioSchema } from "@/lib/zod";
import { z } from "zod";

export type PortfolioFormData =
  | z.infer<typeof developerPortfolioSchema>
  | z.infer<typeof designerPortfolioSchema>
  | z.infer<typeof businessConsultingPortfolioSchema>
  | z.infer<typeof contentCreatorPortfolioSchema>;
export type DeveloperPortfolioFormData = z.infer<typeof developerPortfolioSchema>;
export type DesignerPortfolioFormData = z.infer<typeof designerPortfolioSchema>;
export type BusinessConsultingPortfolioFormData = z.infer<typeof businessConsultingPortfolioSchema>;
export type ContentCreatorPortfolioFormData = z.infer<typeof contentCreatorPortfolioSchema>;
