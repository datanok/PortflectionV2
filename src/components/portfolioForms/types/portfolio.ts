import { basePortfolioSchema, developerPortfolioSchema, designerPortfolioSchema, businessConsultingPortfolioSchema, contentCreatorPortfolioSchema } from "@/lib/zod";
import { z } from "zod";

type WithExtraData<T> = T & { extraData?: Record<string, any> };

export type PortfolioFormData =
  WithExtraData<z.infer<typeof basePortfolioSchema>>
  | WithExtraData<z.infer<typeof developerPortfolioSchema>>
  | WithExtraData<z.infer<typeof designerPortfolioSchema>>
  | WithExtraData<z.infer<typeof businessConsultingPortfolioSchema>>
  | WithExtraData<z.infer<typeof contentCreatorPortfolioSchema>>;
export type DeveloperPortfolioFormData = z.infer<typeof developerPortfolioSchema>;
export type DesignerPortfolioFormData = z.infer<typeof designerPortfolioSchema>;
export type BusinessConsultingPortfolioFormData = z.infer<typeof businessConsultingPortfolioSchema>;
export type ContentCreatorPortfolioFormData = z.infer<typeof contentCreatorPortfolioSchema>;
