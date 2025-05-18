import React from "react";
import {
  useFieldArray,
  Control,
  FieldValues,
  FieldErrors,
  UseFormTrigger,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Trash2,
  PlusCircle,
  Star,
  Image,
  Award,
  DollarSign,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface FormProps<T extends FieldValues> {
  control: Control<T>;
  formState: {
    errors: FieldErrors<T>;
  };
}

interface ContentCreatorPortfolioProps<T extends FieldValues> {
  form: FormProps<T>;
  trigger: UseFormTrigger<T>;
}

// Portfolio item types for dropdown selection
const PORTFOLIO_TYPES = ["Photography", "Video", "Writing", "Podcast"];

// Accolade types for dropdown selection
const ACCOLADE_TYPES = ["Award", "Publication", "Feature"];

// Specialties Section
const SpecialtiesSection = <T extends FieldValues>({
  control,
}: {
  control: Control<T>;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "specialties",
  });

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Star className="h-5 w-5 mr-2 text-yellow-500" />
          Specialties
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center gap-4 p-3 bg-slate-50 rounded-md"
            >
              <FormField
                control={control}
                name={`specialties.${index}`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-xs">Specialty*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Food Photography, Documentary Film Making"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => append("")}
            className="w-full"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Specialty
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Portfolio Items Section
const PortfolioItemsSection = <T extends FieldValues>({
  control,
}: {
  control: Control<T>;
}) => {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "portfolioItems",
  });

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Image className="h-5 w-5 mr-2 text-blue-500" alt="Portfolio items icon" />
          Portfolio Items
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 bg-slate-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Item {index + 1}</h3>
                <div className="flex gap-2">
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => move(index, index - 1)}
                      className="text-gray-500"
                    >
                      ↑
                    </Button>
                  )}
                  {index < fields.length - 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => move(index, index + 1)}
                      className="text-gray-500"
                    >
                      ↓
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormField
                  control={control}
                  name={`portfolioItems.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title*</FormLabel>
                      <FormControl>
                        <Input placeholder="Project title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`portfolioItems.${index}.type`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type*</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PORTFOLIO_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name={`portfolioItems.${index}.description`}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Description*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your work..."
                        className="min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormField
                  control={control}
                  name={`portfolioItems.${index}.url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/project"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`portfolioItems.${index}.image`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured Image URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/image.jpg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-4">
                <FormField
                  control={control}
                  name={`portfolioItems.${index}.tags`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Add tags separated by commas"
                          value={field.value?.join(", ") || ""}
                          onChange={(e) => {
                            const tags = e.target.value
                              .split(",")
                              .map((tag) => tag.trim())
                              .filter((tag) => tag.length > 0);
                            field.onChange(tags);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {field.metadata && (
                  <div className="mt-4 p-4 border rounded-lg">
                    <h4 className="font-medium mb-3">Metadata</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(field.metadata).map(([key, value]) => (
                        <FormField
                          key={key}
                          control={control}
                          name={`portfolioItems.${index}.metadata.${key}`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                title: "",
                type: "Photography",
                description: "",
                tags: [],
              })
            }
            className="w-full"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Portfolio Item
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Testimonials Section
const TestimonialsSection = <T extends FieldValues>({
  control,
}: {
  control: Control<T>;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "testimonials",
  });

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Star className="h-5 w-5 mr-2 text-yellow-500" />
          Client Testimonials
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 bg-slate-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Testimonial {index + 1}</h3>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormField
                  control={control}
                  name={`testimonials.${index}.client`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`testimonials.${index}.image`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Image URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/avatar.jpg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name={`testimonials.${index}.feedback`}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Feedback*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What the client said about your work..."
                        className="min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`testimonials.${index}.date`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input placeholder="June 2023" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                client: "",
                feedback: "",
              })
            }
            className="w-full"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Accolades Section
const AccoladesSection = <T extends FieldValues>({
  control,
}: {
  control: Control<T>;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "accolades",
  });

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Award className="h-5 w-5 mr-2 text-purple-500" />
          Accolades
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 bg-slate-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Accolade {index + 1}</h3>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormField
                  control={control}
                  name={`accolades.${index}.type`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type*</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ACCOLADE_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`accolades.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title*</FormLabel>
                      <FormControl>
                        <Input placeholder="Best Short Film 2023" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormField
                  control={control}
                  name={`accolades.${index}.issuer`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issuer*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="International Film Festival"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`accolades.${index}.date`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date*</FormLabel>
                      <FormControl>
                        <Input placeholder="June 2023" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name={`accolades.${index}.description`}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Details about this accolade..."
                        className="min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name={`accolades.${index}.url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/award"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`accolades.${index}.image`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/award.jpg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                type: "Award",
                title: "",
                issuer: "",
                date: "",
              })
            }
            className="w-full"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Accolade
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Pricing Packages Section
const PricingPackagesSection = <T extends FieldValues>({
  control,
}: {
  control: Control<T>;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "pricingPackages",
  });

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <DollarSign className="h-5 w-5 mr-2 text-green-500" />
          Pricing Packages
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 bg-slate-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Package {index + 1}</h3>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormField
                  control={control}
                  name={`pricingPackages.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Basic Package" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`pricingPackages.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price*</FormLabel>
                      <FormControl>
                        <Input placeholder="$500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name={`pricingPackages.${index}.description`}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Description*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What's included in this package..."
                        className="min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mb-4">
                <FormField
                  control={control}
                  name={`pricingPackages.${index}.features`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features*</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          {field.value?.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-center gap-2"
                            >
                              <Input
                                value={feature}
                                onChange={(e) => {
                                  const newFeatures = [...field.value];
                                  newFeatures[featureIndex] = e.target.value;
                                  field.onChange(newFeatures);
                                }}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newFeatures = [...field.value];
                                  newFeatures.splice(featureIndex, 1);
                                  field.onChange(newFeatures);
                                }}
                                className="text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              field.onChange([...(field.value || []), ""]);
                            }}
                          >
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Feature
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name={`pricingPackages.${index}.popular`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Popular Package</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Mark this as a popular/featured package
                      </p>
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
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                name: "",
                price: "",
                description: "",
                features: [],
                popular: false,
              })
            }
            className="w-full"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Pricing Package
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Portfolio Component
const ContentCreatorPortfolio = <T extends FieldValues>({
  form,
  trigger,
}: ContentCreatorPortfolioProps<T>) => {
  const { control } = form;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">
            Content Creator Portfolio
          </h2>
          <p className="text-sm text-gray-500">
            Showcase your work and services as a content creator
          </p>
        </div>
      </div>

      {/* Specialties Section */}
      <SpecialtiesSection control={control} />

      {/* Portfolio Items Section */}
      <PortfolioItemsSection control={control} />

      {/* Testimonials Section */}
      <TestimonialsSection control={control} />

      {/* Accolades Section */}
      <AccoladesSection control={control} />

      {/* Pricing Packages Section */}
      <PricingPackagesSection control={control} />
    </div>
  );
};

export default ContentCreatorPortfolio;
