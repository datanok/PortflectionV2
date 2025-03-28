import React from 'react';
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

interface ContactInfoTabProps {
    form: UseFormReturn<PortfolioFormData>;
}

const ContactInfoTab: React.FC<ContactInfoTabProps> = ({ form }) => {
    return (
            <div className="space-y-6">
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
                                />
                            </FormControl>
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
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Social Links */}
                <div className="grid md:grid-cols-2 gap-4">
                    {/* GitHub */}
                    <FormField
                        control={form.control}
                        name="socials.github"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>GitHub Profile</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="https://github.com/username" 
                                        {...field} 
                                        value={field.value || ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* LinkedIn */}
                    <FormField
                        control={form.control}
                        name="socials.linkedin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>LinkedIn Profile</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="https://linkedin.com/in/username" 
                                        {...field} 
                                        value={field.value || ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Twitter */}
                    <FormField
                        control={form.control}
                        name="socials.twitter"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Twitter Profile</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="https://twitter.com/username" 
                                        {...field} 
                                        value={field.value || ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Personal Website */}
                    <FormField
                        control={form.control}
                        name="socials.website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Personal Website</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="https://yourwebsite.com" 
                                        {...field} 
                                        value={field.value || ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Optional Social Links */}
                <details className="mt-4">
                    <summary className="cursor-pointer text-sm text-muted-foreground">
                        Additional Social Links (Optional)
                    </summary>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        {/* Instagram */}
                        <FormField
                            control={form.control}
                            name="socials.instagram"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Instagram</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="https://instagram.com/username" 
                                            {...field} 
                                            value={field.value || ''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Dribbble */}
                        <FormField
                            control={form.control}
                            name="socials.dribbble"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dribbble</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="https://dribbble.com/username" 
                                            {...field} 
                                            value={field.value || ''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Behance */}
                        <FormField
                            control={form.control}
                            name="socials.behance"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Behance</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="https://behance.net/username" 
                                            {...field} 
                                            value={field.value || ''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* YouTube */}
                        <FormField
                            control={form.control}
                            name="socials.youtube"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>YouTube</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="https://youtube.com/channel/username" 
                                            {...field} 
                                            value={field.value || ''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Medium */}
                        <FormField
                            control={form.control}
                            name="socials.medium"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Medium</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="https://medium.com/@username" 
                                            {...field} 
                                            value={field.value || ''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </details>

                {/* Contact Form Toggle */}
                <FormField
                    control={form.control}
                    name="contactForm"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mt-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                    Enable Contact Form
                                </FormLabel>
                                <FormDescription>
                                    Allow visitors to send you messages directly through your portfolio
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
    );
};

export default ContactInfoTab;