import React from "react";
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
import { PortfolioFormData } from "./types/portfolio";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { addDummyContactData } from "@/lib/formscripts";
import { Button } from "../ui/button";

interface SocialLink {
  name: string;
  placeholder: string;
  field: keyof PortfolioFormData["socials"];
}

interface ContactInfoTabProps {
  form: UseFormReturn<PortfolioFormData>;
}

const ContactInfoTab: React.FC<ContactInfoTabProps> = ({ form }) => {
  // Primary social links that are always visible
  const primarySocials: SocialLink[] = [
    {
      name: "GitHub Profile",
      placeholder: "https://github.com/username",
      field: "github",
    },
    {
      name: "LinkedIn Profile",
      placeholder: "https://linkedin.com/in/username",
      field: "linkedin",
    },
    {
      name: "Twitter Profile",
      placeholder: "https://twitter.com/username",
      field: "twitter",
    },
    {
      name: "Personal Website",
      placeholder: "https://yourwebsite.com",
      field: "website",
    },
  ];

  // Additional social links shown in the expandable section
  const additionalSocials: SocialLink[] = [
    {
      name: "Instagram",
      placeholder: "https://instagram.com/username",
      field: "instagram",
    },
    {
      name: "Dribbble",
      placeholder: "https://dribbble.com/username",
      field: "dribbble",
    },
    {
      name: "Behance",
      placeholder: "https://behance.net/username",
      field: "behance",
    },
    {
      name: "YouTube",
      placeholder: "https://youtube.com/channel/username",
      field: "youtube",
    },
    {
      name: "Medium",
      placeholder: "https://medium.com/@username",
      field: "medium",
    },
  ];

  // Function to render a social media field
  const renderSocialField = ({ name, placeholder, field }: SocialLink) => (
    <FormField
      key={field}
      control={form.control}
      name={`socials.${field}`}
      render={({ field: formField }) => (
        <FormItem>
          <FormLabel>{name}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...formField}
              value={formField.value || ""}
              className="transition-all focus-visible:ring-offset-2"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card className="border border-border/40 shadow-sm">
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123-456-7890"
                        {...field}
                        maxLength={15}
                        type="tel"
                        inputMode="tel"
                        className="transition-all focus-visible:ring-offset-2"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Your phone number will only be visible if you choose to
                      display it
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="City, Country"
                        {...field}
                        maxLength={50}
                        className="transition-all focus-visible:ring-offset-2"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      General location to display on your portfolio
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Primary Social Links Section */}
            <div>
              <h3 className="text-sm font-medium mb-2 text-muted-foreground">
                Primary Social Links
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {primarySocials.map(renderSocialField)}
              </div>
            </div>

            {/* Optional Social Links */}
            <details className="group">
              <summary className="cursor-pointer text-sm font-medium text-muted-foreground flex items-center gap-2 hover:text-foreground transition-colors">
                <span>Additional Social Links (Optional)</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-open:rotate-180 transition-transform duration-200"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </summary>
              <div className="grid md:grid-cols-2 gap-4 mt-4 animate-in slide-in-from-top-2 duration-300">
                {additionalSocials.map(renderSocialField)}
              </div>
            </details>

            {/* Contact Form Toggle */}
            <FormField
              control={form.control}
              name="contactForm"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mt-6 shadow-sm hover:shadow transition-shadow duration-200">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base cursor-pointer">
                      Enable Contact Form
                    </FormLabel>
                    <FormDescription>
                      Allow visitors to send you messages directly through your
                      portfolio
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-label="Enable contact form"
                      className="data-[state=checked]:bg-primary"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => addDummyContactData(form)}
        className="flex items-center gap-2"
      >
        Load Sample Data
      </Button>
    </div>
  );
};

export default ContactInfoTab;
