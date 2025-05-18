import { 
  basePortfolioSchema, 
  developerPortfolioSchema, 
  designerPortfolioSchema, 
  businessConsultingPortfolioSchema, 
  contentCreatorPortfolioSchema 
} from "@/lib/zod";
import { z } from "zod";

// Helper type for adding extraData
type WithExtraData<T> = T & { extraData?: Record<string, any> };

// Define base types from schema inference
export type BasePortfolioForm = WithExtraData<z.infer<typeof basePortfolioSchema>>;
export type DeveloperPortfolioFormData = WithExtraData<z.infer<typeof developerPortfolioSchema>>;
export type DesignerPortfolioFormData = WithExtraData<z.infer<typeof designerPortfolioSchema>>;
export type BusinessConsultingPortfolioFormData = WithExtraData<z.infer<typeof businessConsultingPortfolioSchema>>;
export type ContentCreatorPortfolioFormData = WithExtraData<z.infer<typeof contentCreatorPortfolioSchema>>;

// Define the union of all portfolio types
export type PortfolioFormData =
  | DeveloperPortfolioFormData
  | DesignerPortfolioFormData
  | BusinessConsultingPortfolioFormData
  | ContentCreatorPortfolioFormData;