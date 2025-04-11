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
import { PhoneInput } from "../phone-input";

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
    <div className="space-y-8 animate-in fade-in duration-300">
  <Card className="border border-border/40 shadow-sm hover:shadow-md transition-all">
    <CardContent className="p-6">
      <div className="space-y-8">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Phone Number</FormLabel>
                <PhoneInput 
                  placeholder="123-456-7890"
                  {...field}
                  maxLength={15}
                  type="tel"
                  inputMode="tel"
                  className="w-full"
                />
                <FormDescription className="text-xs text-muted-foreground mt-1">
                  Only visible if you choose to display it
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
                <FormLabel className="text-sm font-medium">Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="City, Country"
                    {...field}
                    maxLength={50}
                    className="w-full focus:ring-2 focus:ring-primary/20 focus:ring-offset-1"
                  />
                </FormControl>
                <FormDescription className="text-xs text-muted-foreground mt-1">
                  General location to display on your portfolio
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Primary Social Links Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            Primary Social Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {primarySocials.map(renderSocialField)}
          </div>
        </div>

        {/* Optional Social Links */}
        <details className="group rounded-lg border p-4 transition-all hover:bg-muted/20">
          <summary className="cursor-pointer text-sm font-medium flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
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
              className="ml-auto group-open:rotate-180 transition-transform duration-200"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </summary>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4 animate-in slide-in-from-top-2 duration-200">
            {additionalSocials.map(renderSocialField)}
          </div>
        </details>

        {/* Contact Form Toggle */}
        <FormField
          control={form.control}
          name="contactForm"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-5 shadow-sm hover:shadow transition-shadow duration-200 bg-gradient-to-r from-primary/5 to-transparent">
              <div className="space-y-1">
                <FormLabel className="text-base cursor-pointer flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  Enable Contact Form
                </FormLabel>
                <FormDescription className="text-sm text-muted-foreground">
                  Allow visitors to send you messages directly
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
  
</div>
  );
};

export default ContactInfoTab;
