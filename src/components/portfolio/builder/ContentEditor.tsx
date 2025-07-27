import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  ChevronDown,
  ChevronRight,
  Info,
} from "lucide-react";
import { getComponent } from "@/lib/portfolio/registry";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContentEditorProps {
  data: any;
  onUpdate: (newData: any) => void;
  componentType: string;
  componentVariant: string;
}

interface FieldConfig {
  key: string;
  type: "text" | "textarea" | "boolean" | "array" | "object";
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

  // Get defaultProps from the registry for the selected variant
  const defaultProps = useMemo(() => {
    const config = getComponent(componentType as any, componentVariant);
    return config?.defaultProps || {};
  }, [componentType, componentVariant]);

  // Generate field configs from defaultProps
  const fieldConfigs: FieldConfig[] = useMemo(() => {
    return Object.entries(defaultProps).map(([key, value]) => {
      let type: FieldConfig["type"] = "text";
      if (typeof value === "boolean") type = "boolean";
      else if (typeof value === "string" && value.length > 100)
        type = "textarea";
      else if (Array.isArray(value)) type = "array";
      else if (typeof value === "object" && value !== null) type = "object";
      return { key, type };
    });
  }, [defaultProps]);

  const handleFieldUpdate = (key: string, value: any) => {
    const updatedData = { ...data, [key]: value };
    onUpdate(updatedData);
    setEditingField(null);
  };

  const handleArrayItemAdd = (key: string) => {
    const currentArray = data[key] || [];
    let newItem: any;

    // Create appropriate default item based on the key
    if (key === "timelineItems") {
      newItem = {
        year: "2024",
        title: "New Position",
        company: "Company Name",
        description: "Description of the role and achievements",
        type: "work",
      };
    } else if (key === "stats") {
      newItem = {
        number: "0",
        label: "New Stat",
        icon: "code",
      };
    } else if (key === "projects") {
      newItem = {
        id: `${String(currentArray.length + 1).padStart(2, "0")}`,
        title: "New Project",
        category: "Web Application",
        year: "2024",
        description: "Description of the project",
        longDescription:
          "Detailed description of the project, technologies used, and key features.",
        technologies: ["React", "Node.js"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        featured: false,
        status: "completed",
      };
    } else if (key === "contactMethods") {
      newItem = {
        icon: "mail",
        label: "New Contact",
        value: "contact@example.com",
        link: "mailto:contact@example.com",
      };
    } else if (key === "skills") {
      newItem = {
        name: "New Skill",
        level: 75,
        category: "Frontend",
        yearsExperience: 2,
        status: "active",
      };
    } else if (key === "buttons") {
      newItem = {
        label: "New Button",
        href: "#",
        isPrimary: false,
        downloadFile: "",
      };
    } else {
      newItem = "New item";
    }

    const updatedArray = [...currentArray, newItem];
    const updatedData = { ...data, [key]: updatedArray };
    onUpdate(updatedData);
  };

  const handleArrayItemRemove = (key: string, index: number) => {
    const currentArray = data[key] || [];
    const updatedArray = currentArray.filter(
      (_: any, i: number) => i !== index
    );
    const updatedData = { ...data, [key]: updatedArray };
    onUpdate(updatedData);
  };

  const handleArrayItemUpdate = (key: string, index: number, value: any) => {
    const currentArray = data[key] || [];
    const updatedArray = [...currentArray];
    updatedArray[index] = value;
    const updatedData = { ...data, [key]: updatedArray };
    onUpdate(updatedData);
  };

  const handleArrayObjectUpdate = (
    key: string,
    index: number,
    field: string,
    value: any
  ) => {
    const currentArray = data[key] || [];
    const updatedArray = [...currentArray];
    updatedArray[index] = { ...updatedArray[index], [field]: value };
    const updatedData = { ...data, [key]: updatedArray };
    onUpdate(updatedData);
  };

  const renderArrayItem = (item: any, key: string, index: number) => {
    // Handle timeline items
    if (key === "timelineItems" && typeof item === "object") {
      return (
        <div
          key={index}
          className="border rounded-lg p-4 bg-muted/30 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Timeline Item {index + 1}
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleArrayItemRemove(key, index)}
              className="h-6 px-2 text-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Year</Label>
              <Input
                value={item.year || ""}
                onChange={(e) =>
                  handleArrayObjectUpdate(key, index, "year", e.target.value)
                }
                className="text-sm h-8 mt-1"
                placeholder="2024"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Type</Label>
              <Select
                value={item.type || "work"}
                onValueChange={(value) =>
                  handleArrayObjectUpdate(key, index, "type", value)
                }
              >
                <SelectTrigger className="text-sm h-8 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="achievement">Achievement</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Title</Label>
            <Input
              value={item.title || ""}
              onChange={(e) =>
                handleArrayObjectUpdate(key, index, "title", e.target.value)
              }
              className="text-sm h-8 mt-1"
              placeholder="Job Title"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Company</Label>
            <Input
              value={item.company || ""}
              onChange={(e) =>
                handleArrayObjectUpdate(key, index, "company", e.target.value)
              }
              className="text-sm h-8 mt-1"
              placeholder="Company Name"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Description</Label>
            <Textarea
              value={item.description || ""}
              onChange={(e) =>
                handleArrayObjectUpdate(
                  key,
                  index,
                  "description",
                  e.target.value
                )
              }
              className="text-sm mt-1 min-h-[60px]"
              placeholder="Description of the role and achievements"
            />
          </div>
        </div>
      );
    }

    // Handle stats items
    if (key === "stats" && typeof item === "object") {
      return (
        <div
          key={index}
          className="border rounded-lg p-4 bg-muted/30 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Stat {index + 1}</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleArrayItemRemove(key, index)}
              className="h-6 px-2 text-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Number</Label>
              <Input
                value={item.number || ""}
                onChange={(e) =>
                  handleArrayObjectUpdate(key, index, "number", e.target.value)
                }
                className="text-sm h-8 mt-1"
                placeholder="50+"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Label</Label>
              <Input
                value={item.label || ""}
                onChange={(e) =>
                  handleArrayObjectUpdate(key, index, "label", e.target.value)
                }
                className="text-sm h-8 mt-1"
                placeholder="Projects"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Icon</Label>
              <Select
                value={item.icon || "code"}
                onValueChange={(value) =>
                  handleArrayObjectUpdate(key, index, "icon", value)
                }
              >
                <SelectTrigger className="text-sm h-8 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="code">Code</SelectItem>
                  <SelectItem value="calendar">Calendar</SelectItem>
                  <SelectItem value="users">Users</SelectItem>
                  <SelectItem value="coffee">Coffee</SelectItem>
                  <SelectItem value="award">Award</SelectItem>
                  <SelectItem value="book">Book</SelectItem>
                  <SelectItem value="palette">Palette</SelectItem>
                  <SelectItem value="mappin">Map Pin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      );
    }

    // Handle projects items
    if (key === "projects" && typeof item === "object") {
      return (
        <div
          key={index}
          className="border rounded-lg p-4 bg-muted/30 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Project {index + 1}</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleArrayItemRemove(key, index)}
              className="h-6 px-2 text-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">ID</Label>
              <Input
                value={item.id || ""}
                onChange={(e) =>
                  handleArrayObjectUpdate(key, index, "id", e.target.value)
                }
                className="text-sm h-8 mt-1"
                placeholder="PRJ01"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Title</Label>
              <Input
                value={item.title || ""}
                onChange={(e) =>
                  handleArrayObjectUpdate(key, index, "title", e.target.value)
                }
                className="text-sm h-8 mt-1"
                placeholder="My Awesome Project"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Category</Label>
            <Select
              value={item.category || "Web Application"}
              onValueChange={(value) =>
                handleArrayObjectUpdate(key, index, "category", value)
              }
            >
              <SelectTrigger className="text-sm h-8 mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Web Application">Web Application</SelectItem>
                <SelectItem value="Mobile App">Mobile App</SelectItem>
                <SelectItem value="API">API</SelectItem>
                <SelectItem value="Desktop App">Desktop App</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Year</Label>
            <Input
              value={item.year || ""}
              onChange={(e) =>
                handleArrayObjectUpdate(key, index, "year", e.target.value)
              }
              className="text-sm h-8 mt-1"
              placeholder="2024"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Description</Label>
            <Textarea
              value={item.description || ""}
              onChange={(e) =>
                handleArrayObjectUpdate(
                  key,
                  index,
                  "description",
                  e.target.value
                )
              }
              className="text-sm mt-1 min-h-[60px]"
              placeholder="Brief description of the project"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">
              Long Description
            </Label>
            <Textarea
              value={item.longDescription || ""}
              onChange={(e) =>
                handleArrayObjectUpdate(
                  key,
                  index,
                  "longDescription",
                  e.target.value
                )
              }
              className="text-sm mt-1 min-h-[100px]"
              placeholder="Detailed description of the project, technologies used, and key features."
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">
              Technologies
            </Label>
            <Input
              value={
                Array.isArray(item.technologies)
                  ? item.technologies.join(", ")
                  : item.technologies || ""
              }
              onChange={(e) => {
                const technologies = e.target.value
                  .split(",")
                  .map((tech) => tech.trim())
                  .filter((tech) => tech);
                handleArrayObjectUpdate(
                  key,
                  index,
                  "technologies",
                  technologies
                );
              }}
              className="text-sm h-8 mt-1"
              placeholder="React, Node.js, TypeScript (comma-separated)"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Live URL</Label>
            <Input
              value={item.liveUrl || ""}
              onChange={(e) =>
                handleArrayObjectUpdate(key, index, "liveUrl", e.target.value)
              }
              className="text-sm h-8 mt-1"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">GitHub URL</Label>
            <Input
              value={item.githubUrl || ""}
              onChange={(e) =>
                handleArrayObjectUpdate(key, index, "githubUrl", e.target.value)
              }
              className="text-sm h-8 mt-1"
              placeholder="https://github.com/username/repo"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Featured</Label>
            <Switch
              checked={item.featured || false}
              onCheckedChange={(checked) =>
                handleArrayObjectUpdate(key, index, "featured", checked)
              }
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Status</Label>
            <Select
              value={item.status || "completed"}
              onValueChange={(value) =>
                handleArrayObjectUpdate(key, index, "status", value)
              }
            >
              <SelectTrigger className="text-sm h-8 mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    }

    // Handle contact methods items
    if (key === "contactMethods" && typeof item === "object") {
      return (
        <div
          key={index}
          className="border rounded-lg p-4 bg-muted/30 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Contact Method {index + 1}
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleArrayItemRemove(key, index)}
              className="h-6 px-2 text-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Icon</Label>
              <Select
                value={item.icon || "mail"}
                onValueChange={(value) =>
                  handleArrayObjectUpdate(key, index, "icon", value)
                }
              >
                <SelectTrigger className="text-sm h-8 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mail">Mail</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="github">GitHub</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Label</Label>
              <Input
                value={item.label || ""}
                onChange={(e) =>
                  handleArrayObjectUpdate(key, index, "label", e.target.value)
                }
                className="text-sm h-8 mt-1"
                placeholder="Email"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Value</Label>
              <Input
                value={item.value || ""}
                onChange={(e) =>
                  handleArrayObjectUpdate(key, index, "value", e.target.value)
                }
                className="text-sm h-8 mt-1"
                placeholder="contact@example.com"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Link</Label>
            <Input
              value={item.link || ""}
              onChange={(e) =>
                handleArrayObjectUpdate(key, index, "link", e.target.value)
              }
              className="text-sm h-8 mt-1"
              placeholder="https://example.com"
            />
          </div>
        </div>
      );
    }

    // Handle skills items
    if (key === "skills" && typeof item === "object") {
      return (
        <div
          key={index}
          className="border rounded-lg p-4 bg-muted/30 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Skill {index + 1}</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleArrayItemRemove(key, index)}
              className="h-6 px-2 text-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Name</Label>
              <Input
                value={item.name || ""}
                onChange={(e) =>
                  handleArrayObjectUpdate(key, index, "name", e.target.value)
                }
                className="text-sm h-8 mt-1"
                placeholder="JavaScript"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Category</Label>
              <Select
                value={item.category || "Frontend"}
                onValueChange={(value) =>
                  handleArrayObjectUpdate(key, index, "category", value)
                }
              >
                <SelectTrigger className="text-sm h-8 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="DevOps">DevOps</SelectItem>
                  <SelectItem value="Cloud">Cloud</SelectItem>
                  <SelectItem value="Database">Database</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Level (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={item.level || 75}
                onChange={(e) =>
                  handleArrayObjectUpdate(
                    key,
                    index,
                    "level",
                    parseInt(e.target.value) || 0
                  )
                }
                className="text-sm h-8 mt-1"
                placeholder="75"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">
                Years Experience
              </Label>
              <Input
                type="number"
                min="0"
                value={item.yearsExperience || 2}
                onChange={(e) =>
                  handleArrayObjectUpdate(
                    key,
                    index,
                    "yearsExperience",
                    parseInt(e.target.value) || 0
                  )
                }
                className="text-sm h-8 mt-1"
                placeholder="2"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Status</Label>
            <Select
              value={item.status || "active"}
              onValueChange={(value) =>
                handleArrayObjectUpdate(key, index, "status", value)
              }
            >
              <SelectTrigger className="text-sm h-8 mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expert">Expert</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="learning">Learning</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    }

    // Handle buttons items
    if (key === "buttons" && typeof item === "object") {
      return (
        <div
          key={index}
          className="border rounded-lg p-4 bg-muted/30 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Button {index + 1}</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleArrayItemRemove(key, index)}
              className="h-6 px-2 text-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Label</Label>
              <Input
                value={item.label || ""}
                onChange={(e) =>
                  handleArrayObjectUpdate(key, index, "label", e.target.value)
                }
                className="text-sm h-8 mt-1"
                placeholder="Download Resume"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Href</Label>
              <Input
                value={item.href || ""}
                onChange={(e) =>
                  handleArrayObjectUpdate(key, index, "href", e.target.value)
                }
                className="text-sm h-8 mt-1"
                placeholder="https://example.com/resume.pdf"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Is Primary</Label>
            <Switch
              checked={item.isPrimary || false}
              onCheckedChange={(checked) =>
                handleArrayObjectUpdate(key, index, "isPrimary", checked)
              }
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">
              Download File
            </Label>
            <Input
              value={item.downloadFile || ""}
              onChange={(e) =>
                handleArrayObjectUpdate(
                  key,
                  index,
                  "downloadFile",
                  e.target.value
                )
              }
              className="text-sm h-8 mt-1"
              placeholder="resume.pdf"
            />
          </div>
        </div>
      );
    }

    // Default simple string item
    return (
      <div key={index} className="border rounded-lg p-3 bg-muted/30">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Item {index + 1}</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleArrayItemRemove(key, index)}
            className="h-6 px-2 text-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
        <Input
          value={item}
          onChange={(e) => handleArrayItemUpdate(key, index, e.target.value)}
          className="text-sm h-8"
          placeholder="Enter value"
        />
      </div>
    );
  };

  const renderField = (field: FieldConfig) => {
    const { key, type } = field;
    const value = data[key];
    const isEditing = editingField === key;
    const displayValue =
      typeof value === "boolean" ? (value ? "Yes" : "No") : value;

    if (type === "array") {
      const arrayValue = Array.isArray(value) ? value : [];
      return (
        <Card key={key} className="mb-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{key}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {arrayValue.length} items
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
          </CardHeader>
          <CardContent className="pt-0">
            {arrayValue.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <Plus className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No items yet</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleArrayItemAdd(key)}
                  className="mt-2"
                >
                  Add First Item
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {arrayValue.map((item: any, index: number) =>
                  renderArrayItem(item, key, index)
                )}
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
              <CardTitle className="text-sm font-medium">{key}</CardTitle>
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
          </CardHeader>
          {isExpanded && (
            <CardContent className="pt-0">
              <div className="space-y-3">
                {value &&
                  typeof value === "object" &&
                  Object.entries(value).map(([objKey, objValue]) => (
                    <div key={objKey}>
                      <Label className="text-xs text-muted-foreground">
                        {objKey}
                      </Label>
                      <Input
                        value={objValue as string}
                        onChange={(e) => {
                          const updatedValue = {
                            ...value,
                            [objKey]: e.target.value,
                          };
                          handleFieldUpdate(key, updatedValue);
                        }}
                        className="mt-1 text-sm h-8"
                        placeholder={`Enter ${objKey}`}
                      />
                    </div>
                  ))}
              </div>
            </CardContent>
          )}
        </Card>
      );
    }

    // Special handling for layoutMode dropdown
    if (key === "layoutMode") {
      return (
        <Card key={key} className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Layout Mode</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Select
              value={value || "list"}
              onValueChange={(newValue) => handleFieldUpdate(key, newValue)}
            >
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="list">List</SelectItem>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      );
    }

    // Simple field (text, textarea, boolean)
    return (
      <Card key={key} className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">{key}</CardTitle>
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
                  className="h-6 px-2 text-muted-foreground"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {isEditing ? (
            <div className="space-y-3">
              {type === "boolean" ? (
                <div className="flex items-center gap-3">
                  <Switch checked={editValue} onCheckedChange={setEditValue} />
                  <span className="text-sm text-muted-foreground">
                    {editValue ? "Enabled" : "Disabled"}
                  </span>
                </div>
              ) : type === "textarea" ? (
                <Textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="text-sm min-h-[80px]"
                />
              ) : (
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="text-sm h-8"
                />
              )}
            </div>
          ) : (
            <div className="text-sm text-foreground bg-muted/30 p-3 rounded border min-h-[40px] flex items-center">
              {displayValue || (
                <span className="text-muted-foreground italic">Empty</span>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 w-full max-w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Content Editor</h3>
        <Badge variant="outline" className="text-xs">
          {componentType} - {componentVariant}
        </Badge>
      </div>
      <Separator />
      {fieldConfigs.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Info className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-sm">
            No editable content found for this component.
          </p>
          <p className="text-xs mt-1">Check the component configuration.</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto w-full max-w-full">
          {fieldConfigs.map(renderField)}
        </div>
      )}
    </div>
  );
}
