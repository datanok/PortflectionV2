import React from "react";
import {
  useFieldArray,
  Control,
  FieldValues,
  FieldErrors,
  UseFormTrigger,
  Path,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Trash2, PlusCircle, Award, BarChart2, Users, FileText } from "lucide-react";
import { toast } from "sonner";

import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FormProps<T extends FieldValues> {
  control: Control<T>;
  formState: {
    errors: FieldErrors<T>;
  };
}

interface BusinessConsultingPortfolioProps<T extends FieldValues> {
  form: FormProps<T>;
  trigger: UseFormTrigger<T>;
}


// Key Metrics Component
const KeyMetrics = <T extends FieldValues>({
  control,
  caseStudyIndex,
}: {
  control: Control<T>;
  caseStudyIndex: number;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `caseStudies.${caseStudyIndex}.keyMetrics`,
  });

  const handleAddMetric = () => {
    append({ name: "", value: "" });
  };

  return (
    <div className="space-y-2">
      <FormLabel>Key Metrics</FormLabel>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-start">
            <div className="grid grid-cols-2 gap-2 flex-1">
              <FormField
                control={control}
                name={`caseStudies.${caseStudyIndex}.keyMetrics.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Metric name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`caseStudies.${caseStudyIndex}.keyMetrics.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Metric value" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(index)}
              className="text-red-500 hover:bg-red-50 mt-1"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAddMetric}
        className="mt-2"
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Metric
      </Button>
    </div>
  );
};

// Testimonials Component
const Testimonials = <T extends FieldValues>({
  control,
  caseStudyIndex,
}: {
  control: Control<T>;
  caseStudyIndex: number;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `caseStudies.${caseStudyIndex}.testimonials`,
  });

  const handleAddTestimonial = () => {
    append({ name: "", position: "", content: "" });
  };

  return (
    <div className="space-y-2">
      <FormLabel>Testimonials</FormLabel>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <Card key={field.id} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                <FormField
                  control={control}
                  name={`caseStudies.${caseStudyIndex}.testimonials.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Client name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`caseStudies.${caseStudyIndex}.testimonials.${index}.position`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position*</FormLabel>
                      <FormControl>
                        <Input placeholder="Client position" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`caseStudies.${caseStudyIndex}.testimonials.${index}.company`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
                className="text-red-500 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <FormField
              control={control}
              name={`caseStudies.${caseStudyIndex}.testimonials.${index}.content`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Testimonial*</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Client testimonial"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAddTestimonial}
        className="mt-2"
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Testimonial
      </Button>
    </div>
  );
};



// Certifications Component
const Certifications = <T extends FieldValues>({
  control,
}: {
  control: Control<T>;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  const handleAddCertification = () => {
    append({
      name: "",
      issuingOrganization: "",
      issueDate: "",
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Award className="h-5 w-5 mr-2 text-yellow-500" />
          Certifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field, index) => (
          <Card key={field.id} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                <FormField
                  control={control}
                  name={`certifications.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certification Name*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. PMP Certification"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`certifications.${index}.issuingOrganization`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issuing Organization*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Project Management Institute"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`certifications.${index}.issueDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue Date*</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`certifications.${index}.expiryDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`certifications.${index}.credentialID`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credential ID</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`certifications.${index}.credentialURL`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credential URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/verify"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
                className="text-red-500 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={handleAddCertification}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" /> Add Certification
        </Button>
      </CardContent>
    </Card>
  );
};

// Key Achievements Component
const KeyAchievements = <T extends FieldValues>({
  control,
}: {
  control: Control<T>;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "keyAchievements",
  });

  const handleAddAchievement = () => {
    append({
      title: "",
      description: "",
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Award className="h-5 w-5 mr-2 text-green-500" />
          Key Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field, index) => (
          <Card key={field.id} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="grid grid-cols-1 gap-4 flex-1">
                <FormField
                  control={control}
                  name={`keyAchievements.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Increased client revenue by 30%"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`keyAchievements.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description*</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the achievement and its significance"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`keyAchievements.${index}.impact`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Impact</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What was the measurable impact?"
                          className="min-h-[60px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`keyAchievements.${index}.date`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
                className="text-red-500 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={handleAddAchievement}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" /> Add Achievement
        </Button>
      </CardContent>
    </Card>
  );
};

// Main Portfolio Component
const BusinessConsultingPortfolio = <T extends FieldValues>({
  form,
  trigger,
}: BusinessConsultingPortfolioProps<T>) => {
  const { control, setValue } = form;

  const {
    fields: caseStudyFields,
    append: appendCaseStudy,
    remove: removeCaseStudy,
    move: moveCaseStudy,
  } = useFieldArray({
    control,
    name: "caseStudies",
  });



  const handleAddCaseStudy = async () => {
    const isValid = await trigger("caseStudies" as Path<T>);
    if (caseStudyFields.length > 0 && !isValid) return;

    appendCaseStudy({
      title: "",
      organization: "",
      role: "",
      startDate: "",
      description: "",
      featured: false,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">Consulting Portfolio</h2>
          <p className="text-sm text-gray-500">
            Showcase your consulting expertise and case studies
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="default"
            onClick={handleAddCaseStudy}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" /> Add Case Study
          </Button>
    
        </div>
      </div>

      {/* Case Studies Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-orange-500" />
          Case Studies
        </h2>

        {caseStudyFields.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg mb-6">
            <p className="mb-2 text-gray-500">No case studies added yet</p>
            <p className="mb-4 text-sm text-gray-400">
              Showcase your consulting experience by adding your first case study
            </p>
            <Button
              type="button"
              variant="default"
              onClick={handleAddCaseStudy}
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" /> Add Your First Case Study
            </Button>
          </div>
        )}

        {caseStudyFields.map((caseStudy, caseStudyIndex) => (
          <Card
            key={caseStudy.id}
            className="w-full border-gray-200 shadow-sm mb-6"
          >
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="text-gray-400">#{caseStudyIndex + 1}</span>
                  {caseStudy.title || "New Case Study"}
                </CardTitle>
              </div>
              <div className="flex gap-2">
                {caseStudyIndex > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      moveCaseStudy(caseStudyIndex, caseStudyIndex - 1)
                    }
                    className="text-gray-500"
                  >
                    ↑
                  </Button>
                )}
                {caseStudyIndex < caseStudyFields.length - 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      moveCaseStudy(caseStudyIndex, caseStudyIndex + 1)
                    }
                    className="text-gray-500"
                  >
                    ↓
                  </Button>
                )}
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeCaseStudy(caseStudyIndex)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="details">Project Details</TabsTrigger>
                  <TabsTrigger value="evidence">Evidence</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={control}
                      name={`caseStudies.${caseStudyIndex}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Title*</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Digital Transformation Strategy"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`caseStudies.${caseStudyIndex}.organization`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client Organization*</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Acme Corporation"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={control}
                      name={`caseStudies.${caseStudyIndex}.role`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Role*</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Lead Consultant"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`caseStudies.${caseStudyIndex}.startDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date*</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`caseStudies.${caseStudyIndex}.endDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              disabled={caseStudy.ongoing}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={control}
                    name={`caseStudies.${caseStudyIndex}.ongoing`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Ongoing Project</FormLabel>
                          <FormDescription>
                            Check if this project is still active
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

                  <FormField
                    control={control}
                    name={`caseStudies.${caseStudyIndex}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Description*</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the project scope, objectives, and your involvement"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`caseStudies.${caseStudyIndex}.teamSize`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team Size</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Number of team members"
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value ? parseInt(e.target.value) : null
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  <FormField
                    control={control}
                    name={`caseStudies.${caseStudyIndex}.challenges`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Challenges</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What were the key challenges faced?"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`caseStudies.${caseStudyIndex}.solutions`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Solutions Implemented</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What solutions did you provide?"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`caseStudies.${caseStudyIndex}.outcomes`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Outcomes & Results</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What were the measurable outcomes?"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <KeyMetrics
                    control={control}
                    caseStudyIndex={caseStudyIndex}
                  />
                </TabsContent>

                <TabsContent value="evidence" className="space-y-4">
                  <Testimonials
                    control={control}
                    caseStudyIndex={caseStudyIndex}
                  />

                  <FormField
                    control={control}
                    name={`caseStudies.${caseStudyIndex}.featured`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Featured Case Study</FormLabel>
                          <FormDescription>
                            Highlight this case study in your portfolio
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
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>


      {/* Certifications Section */}
      <Certifications control={control} />

      {/* Key Achievements Section */}
      <KeyAchievements control={control} />

      {caseStudyFields.length > 0 && (
        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={handleAddCaseStudy}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" /> Add Another Case Study
          </Button>
        </div>
      )}
    </div>
  );
};

export default BusinessConsultingPortfolio;