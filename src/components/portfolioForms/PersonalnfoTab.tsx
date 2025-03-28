import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";
import { PortfolioFormData } from "./types/portfolio";
import { Textarea } from "../ui/textarea";

interface PersonalInfoTabProps {
  form: UseFormReturn<PortfolioFormData>;
}

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Professional Title</FormLabel>
            <FormControl>
              <Input placeholder="Full Stack Developer" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email Address</FormLabel>
            <FormControl>
              <Input placeholder="your.email@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

     

      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input placeholder="New York, USA" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="about"
        render={({ field }) => (
          <FormItem>
            <FormLabel>About Me</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell potential clients or employers about yourself..."
                className="min-h-32"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Minimum 50 characters. This will be displayed prominently on your
              portfolio.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default PersonalInfoTab;
