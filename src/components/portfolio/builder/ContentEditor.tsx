import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface ContentEditorProps {
  data: any;
  onUpdate: (newData: any) => void;
  componentType: string;
  componentVariant: string;
}

interface EditableField {
  key: string;
  value: any;
  type: "string" | "number" | "boolean" | "array" | "object";
  label: string;
  description?: string;
  placeholder?: string;
  isRequired?: boolean;
}

export default function ContentEditor({
  data,
  onUpdate,
  componentType,
  componentVariant,
}: ContentEditorProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<any>("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  // Convert data object to editable fields
  const getEditableFields = (obj: any, prefix = ""): EditableField[] => {
    const fields: EditableField[] = [];

    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      const label = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());

      if (Array.isArray(value)) {
        fields.push({
          key: fullKey,
          value,
          type: "array",
          label,
          description: `${value.length} item${value.length !== 1 ? "s" : ""}`,
        });
      } else if (typeof value === "object" && value !== null) {
        fields.push({
          key: fullKey,
          value,
          type: "object",
          label,
          description: "Object with multiple properties",
        });
      } else {
        fields.push({
          key: fullKey,
          value,
          type: typeof value as "string" | "number" | "boolean",
          label,
          placeholder: `Enter ${label.toLowerCase()}`,
        });
      }
    }

    return fields;
  };

  const updateNestedValue = (obj: any, path: string, value: any): any => {
    const keys = path.split(".");
    const newObj = { ...obj };

    let current = newObj;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;

    return newObj;
  };

  const getNestedValue = (obj: any, path: string): any => {
    const keys = path.split(".");
    let current = obj;
    for (const key of keys) {
      current = current?.[key];
    }
    return current;
  };

  const handleFieldUpdate = (path: string, value: any) => {
    const updatedData = updateNestedValue(data, path, value);
    onUpdate(updatedData);
    setEditingField(null);
  };

  const handleArrayItemAdd = (path: string) => {
    const currentArray = getNestedValue(data, path) || [];
    const newItem = getDefaultItemForArray(path);
    const updatedArray = [...currentArray, newItem];
    const updatedData = updateNestedValue(data, path, updatedArray);
    onUpdate(updatedData);
  };

  const handleArrayItemRemove = (path: string, index: number) => {
    const currentArray = getNestedValue(data, path) || [];
    const updatedArray = currentArray.filter(
      (_: any, i: number) => i !== index
    );
    const updatedData = updateNestedValue(data, path, updatedArray);
    onUpdate(updatedData);
  };

  const handleArrayItemUpdate = (path: string, index: number, value: any) => {
    const currentArray = getNestedValue(data, path) || [];
    const updatedArray = [...currentArray];
    updatedArray[index] = value;
    const updatedData = updateNestedValue(data, path, updatedArray);
    onUpdate(updatedData);
  };

  const getDefaultItemForArray = (path: string): any => {
    // Provide sensible defaults based on the array type
    if (path.includes("projects")) {
      return {
        id: `project-${Date.now()}`,
        title: "New Project",
        description: "Project description",
        technologies: [],
        liveUrl: "",
        githubUrl: "",
        image: "",
      };
    }
    if (path.includes("experience")) {
      return {
        id: `exp-${Date.now()}`,
        title: "New Position",
        company: "Company Name",
        duration: "2023 - Present",
        description: "Job description",
        achievements: [],
      };
    }
    if (path.includes("testimonials")) {
      return {
        id: `testimonial-${Date.now()}`,
        name: "Client Name",
        role: "Client Role",
        company: "Company",
        content: "Testimonial content",
        avatar: "",
      };
    }
    if (path.includes("skills")) {
      return {
        name: "New Skill",
        level: 80,
        category: "Technical",
      };
    }
    if (path.includes("highlights") || path.includes("achievements")) {
      return "New item";
    }
    if (path.includes("technologies")) {
      return "New technology";
    }
    return "New item";
  };

  const renderField = (field: EditableField) => {
    const { key, value, type, label, description, placeholder } = field;

    if (type === "array") {
      return (
        <Card key={key} className="mb-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{label}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {value.length} items
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleArrayItemAdd(key)}
                  className="h-6 px-2"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add
                </Button>
              </div>
            </div>
            {description && (
              <p className="text-xs text-gray-500">{description}</p>
            )}
          </CardHeader>
          <CardContent className="pt-0">
            {value.length === 0 ? (
              <p className="text-sm text-gray-400 italic">No items yet</p>
            ) : (
              <div className="space-y-2">
                {value.map((item: any, index: number) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Item {index + 1}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleArrayItemRemove(key, index)}
                        className="h-6 px-2 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    {typeof item === "object" ? (
                      <div className="space-y-2">
                        {Object.entries(item).map(([itemKey, itemValue]) => (
                          <div key={itemKey}>
                            <Label className="text-xs text-gray-600">
                              {itemKey
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                            </Label>
                            {typeof itemValue === "string" ? (
                              <Input
                                value={itemValue as string}
                                onChange={(e) => {
                                  const updatedItem = {
                                    ...item,
                                    [itemKey]: e.target.value,
                                  };
                                  handleArrayItemUpdate(
                                    key,
                                    index,
                                    updatedItem
                                  );
                                }}
                                className="mt-1 text-sm"
                                placeholder={`Enter ${itemKey}`}
                              />
                            ) : (
                              <div className="mt-1 text-sm text-gray-500">
                                {JSON.stringify(itemValue)}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Input
                        value={item}
                        onChange={(e) =>
                          handleArrayItemUpdate(key, index, e.target.value)
                        }
                        className="text-sm"
                        placeholder="Enter value"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      );
    }

    if (type === "object") {
      const isExpanded = expandedSections.has(key);
      return (
        <Card key={key} className="mb-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{label}</CardTitle>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  const newExpanded = new Set(expandedSections);
                  if (isExpanded) {
                    newExpanded.delete(key);
                  } else {
                    newExpanded.add(key);
                  }
                  setExpandedSections(newExpanded);
                }}
                className="h-6 px-2"
              >
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </Button>
            </div>
            {description && (
              <p className="text-xs text-gray-500">{description}</p>
            )}
          </CardHeader>
          {isExpanded && (
            <CardContent className="pt-0">
              <div className="space-y-3">
                {getEditableFields(value, key).map((nestedField) =>
                  renderField(nestedField)
                )}
              </div>
            </CardContent>
          )}
        </Card>
      );
    }

    // Simple field (string, number, boolean)
    const isEditing = editingField === key;
    const displayValue =
      typeof value === "boolean" ? (value ? "Yes" : "No") : value;

    return (
      <div key={key} className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm font-medium">{label}</Label>
          {!isEditing ? (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setEditingField(key);
                setEditValue(value);
              }}
              className="h-6 px-2"
            >
              <Edit3 className="w-3 h-3" />
            </Button>
          ) : (
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleFieldUpdate(key, editValue)}
                className="h-6 px-2 text-green-600"
              >
                <Save className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setEditingField(null)}
                className="h-6 px-2 text-gray-600"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-2">
            {type === "boolean" ? (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={editValue ? "default" : "outline"}
                  onClick={() => setEditValue(true)}
                >
                  Yes
                </Button>
                <Button
                  size="sm"
                  variant={!editValue ? "default" : "outline"}
                  onClick={() => setEditValue(false)}
                >
                  No
                </Button>
              </div>
            ) : type === "number" ? (
              <Input
                type="number"
                value={editValue}
                onChange={(e) => setEditValue(Number(e.target.value))}
                placeholder={placeholder}
                className="text-sm"
              />
            ) : (
              <Textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder={placeholder}
                className="text-sm"
                rows={3}
              />
            )}
          </div>
        ) : (
          <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded border">
            {displayValue || (
              <span className="text-gray-400 italic">Empty</span>
            )}
          </div>
        )}
      </div>
    );
  };

  const fields = getEditableFields(data);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Content Editor</h3>
        <Badge variant="outline" className="text-xs">
          {componentType} - {componentVariant}
        </Badge>
      </div>

      <Separator />

      {fields.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No editable content found for this component.</p>
        </div>
      ) : (
        <div className="space-y-4">{fields.map(renderField)}</div>
      )}
    </div>
  );
}
