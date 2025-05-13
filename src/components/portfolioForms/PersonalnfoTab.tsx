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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import React from "react";

interface PersonalInfoTabProps {
  form: UseFormReturn<PortfolioFormData>;
}

const SkillsInput = ({
  value = [],
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) => {
  const [skill, setSkills] = React.useState<string[]>(value ?? []);
  const [inputValue, setInputValue] = React.useState("");

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !skill.includes(trimmed)) {
      const newSkills = [...skill, trimmed];
      setSkills(newSkills);
      onChange(newSkills); // ✅ Send as array
      setInputValue("");
    }
  };

  const removeTag = (skillToRemove: string) => {
    const newSkills = skill.filter((tag) => tag !== skillToRemove);
    setSkills(newSkills);
    onChange(newSkills); // ✅ Send as array
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  // Keep internal state in sync when form resets
  React.useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(skill)) {
      setSkills(value ?? []);
    }
  }, [value]);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {skill.map((tag,idx) => (
          <Badge
            key={tag + idx}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 text-xs hover:text-red-500"
            >
              ×
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add technology and press Enter"
          className="flex-1"
        />
        <Button type="button" variant="outline" size="sm" onClick={addTag}>
          Add
        </Button>
      </div>
    </div>
  );
};


const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({ form }) => {
  const { control } = form;
  return (
    <Card className="w-full border-gray-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
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
          control={control}
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
          control={control}
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
          control={control}
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
          control={control}
          name="profileImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <Input placeholder="Enter Image link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About Me</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell potential clients or employers about yourself..."
                  className="min-h-32 focus:ring-2 focus:ring-blue-500"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Minimum 50 characters. This will be displayed prominently on your portfolio.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


          <FormField
            control={control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <SkillsInput
                    value={field.value || []}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Enter skills one at a time (e.g. JavaScript, React, Node.js)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

      </CardContent>
    </Card>
  );
};

export default PersonalInfoTab;
