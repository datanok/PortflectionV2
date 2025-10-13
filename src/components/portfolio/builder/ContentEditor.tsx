import React, { useState, useMemo, useCallback, useEffect } from "react";
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
  ChevronDown,
  ChevronRight,
  Info,
  CheckCircle,
  Clock,
  Image as ImageIcon,
  Smile,
} from "lucide-react";
import { getComponent } from "@/lib/portfolio/registry";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FieldMetadata } from "@/lib/portfolio/registry";
import { Memoji } from "@/types/memoji";
import { getOptimizedMemojiUrl } from "@/lib/memoji-utils";
import SimpleMemojiPicker from "@/components/ui/SimpleMemojiPicker";

interface ContentEditorProps {
  data: any;
  onUpdate: (newData: any) => void;
  componentType: string;
  componentVariant: string;
}

interface FieldConfig {
  key: string;
  type:
    | "text"
    | "textarea"
    | "boolean"
    | "array"
    | "object"
    | "select"
    | "number";
  metadata?: FieldMetadata;
}

// Debounce hook for auto-save
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function ContentEditor({
  data,
  onUpdate,
  componentType,
  componentVariant,
}: ContentEditorProps) {
  // Initialize local data with defaultProps merged with incoming data
  const [localData, setLocalData] = useState(data);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "pending">(
    "saved"
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentImageField, setCurrentImageField] = useState<string>("");
  const [selectedMemoji, setSelectedMemoji] = useState<Memoji | null>(null);

  // Debounce local data changes for auto-save
  const debouncedData = useDebounce(localData, 500);

  // Get defaultProps and propsSchema from the registry for the selected variant
  const componentConfig = useMemo(() => {
    const config = getComponent(componentType as any, componentVariant);
    return {
      defaultProps: config?.defaultProps || {},
      propsSchema: config?.propsSchema || {},
    };
  }, [componentType, componentVariant]);

  // Update local data when props change or component type changes
  useEffect(() => {
    // Always prioritize incoming data over defaults
    // Only use defaultProps for keys that don't exist in data
    if (Object.keys(componentConfig.defaultProps).length > 0) {
      const mergedData: any = {};

      // First, add all default props
      Object.keys(componentConfig.defaultProps).forEach((key) => {
        mergedData[key] = componentConfig.defaultProps[key];
      });

      // Then override with incoming data (which preserves user changes)
      Object.keys(data).forEach((key) => {
        const value = data[key];
        // Only override if the value is meaningful
        if (value !== undefined && value !== null) {
          // For arrays, only override if non-empty
          if (Array.isArray(value)) {
            if (value.length > 0) {
              mergedData[key] = value;
            }
          }
          // For objects, only override if non-empty
          else if (typeof value === "object" && Object.keys(value).length > 0) {
            mergedData[key] = value;
          }
          // For primitives, always override (including empty strings if intentional)
          else if (typeof value !== "object") {
            mergedData[key] = value;
          }
        }
      });

      setLocalData(mergedData);
    } else {
      setLocalData(data);
    }
  }, [data, componentType, componentVariant, componentConfig.defaultProps]);

  // Auto-save when debounced data changes
  useEffect(() => {
    if (JSON.stringify(debouncedData) !== JSON.stringify(data)) {
      setSaveStatus("saving");
      onUpdate(debouncedData);
      // Simulate save completion
      setTimeout(() => setSaveStatus("saved"), 300);
    }
  }, [debouncedData, data, onUpdate]);

  // Generate field configs from defaultProps and propsSchema
  const fieldConfigs: FieldConfig[] = useMemo(() => {
    const { defaultProps, propsSchema } = componentConfig;

    return Object.entries(defaultProps).map(([key, value]) => {
      let type: FieldConfig["type"] = "text";
      let metadata: FieldMetadata | undefined;

      // Check if we have schema metadata for this field
      if (propsSchema[key]) {
        metadata = propsSchema[key];
        type = metadata.type;
      } else {
        // Fallback to auto-detection
        if (typeof value === "boolean") type = "boolean";
        else if (typeof value === "string" && value.length > 100)
          type = "textarea";
        else if (Array.isArray(value)) type = "array";
        else if (typeof value === "object" && value !== null) type = "object";
      }

      return { key, type, metadata };
    });
  }, [componentConfig]);

  const handleFieldUpdate = useCallback((key: string, value: any) => {
    setLocalData((prev) => ({ ...prev, [key]: value }));
    setSaveStatus("pending");
  }, []);

  // Handle memoji selection
  const handleMemojiSelect = useCallback(
    (memoji: Memoji) => {
      if (currentImageField) {
        const optimizedUrl = getOptimizedMemojiUrl(memoji.fileName, {
          width: 400,
          height: 400,
          quality: "auto",
          format: "auto",
        });
        handleFieldUpdate(currentImageField, optimizedUrl);
        setSelectedMemoji(memoji);
        setIsDialogOpen(false);
      }
    },
    [currentImageField, handleFieldUpdate]
  );

  // Open image picker dialog
  const openImagePicker = useCallback((fieldKey: string) => {
    setCurrentImageField(fieldKey);
    setIsDialogOpen(true);
  }, []);

  const handleArrayItemAdd = useCallback(
    (key: string) => {
      const currentArray = localData[key] || [];
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
      } else if (key === "socialLinks") {
        newItem = {
          platform: "GitHub",
          url: "https://github.com",
          username: "@username",
        };
      } else {
        newItem = "New item";
      }

      const updatedArray = [...currentArray, newItem];
      setLocalData((prev) => ({ ...prev, [key]: updatedArray }));
      setSaveStatus("pending");
    },
    [localData]
  );

  const handleArrayItemRemove = useCallback(
    (key: string, index: number) => {
      const currentArray = localData[key] || [];
      const updatedArray = currentArray.filter(
        (_: any, i: number) => i !== index
      );
      setLocalData((prev) => ({ ...prev, [key]: updatedArray }));
      setSaveStatus("pending");
    },
    [localData]
  );

  const handleArrayItemUpdate = useCallback(
    (key: string, index: number, value: any) => {
      const currentArray = localData[key] || [];
      const updatedArray = [...currentArray];
      updatedArray[index] = value;
      setLocalData((prev) => ({ ...prev, [key]: updatedArray }));
      setSaveStatus("pending");
    },
    [localData]
  );

  const handleArrayObjectUpdate = useCallback(
    (key: string, index: number, field: string, value: any) => {
      const currentArray = localData[key] || [];
      const updatedArray = [...currentArray];
      updatedArray[index] = { ...updatedArray[index], [field]: value };
      setLocalData((prev) => ({ ...prev, [key]: updatedArray }));
      setSaveStatus("pending");
    },
    [localData]
  );

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

          {item.longDescription && item.longDescription !== "" && (
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
          )}

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
            <Label className="text-xs text-muted-foreground">Image URL</Label>
            <Input
              value={item.imageUrl || ""}
              onChange={(e) =>
                handleArrayObjectUpdate(key, index, "imageUrl", e.target.value)
              }
              className="text-sm h-8 mt-1"
              placeholder="https://example.com/image.jpg"
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

    // Handle social links items
    if (key === "socialLinks" && typeof item === "object") {
      return (
        <div
          key={index}
          className="border rounded-lg p-4 bg-muted/30 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Social Link {index + 1}</span>
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
              <Label className="text-xs text-muted-foreground">Platform</Label>
              <Select
                value={item.platform || "GitHub"}
                onValueChange={(value) =>
                  handleArrayObjectUpdate(key, index, "platform", value)
                }
              >
                <SelectTrigger className="text-sm h-8 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GitHub">GitHub</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="YouTube">YouTube</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">URL</Label>
              <Input
                value={item.url || ""}
                onChange={(e) =>
                  handleArrayObjectUpdate(key, index, "url", e.target.value)
                }
                className="text-sm h-8 mt-1"
                placeholder="https://github.com/username"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Username</Label>
              <Input
                value={item.username || ""}
                onChange={(e) =>
                  handleArrayObjectUpdate(
                    key,
                    index,
                    "username",
                    e.target.value
                  )
                }
                className="text-sm h-8 mt-1"
                placeholder="@username"
              />
            </div>
          </div>
        </div>
      );
    }

    // Handle objects in array items
    if (typeof item === "object" && item !== null) {
      return (
        <div
          key={index}
          className="border rounded-lg p-3 bg-muted/30 space-y-2"
        >
          <div className="flex items-center justify-between">
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
          <div className="space-y-2">
            {Object.entries(item).map(([objKey, objValue]) => (
              <div key={objKey}>
                <Label className="text-xs font-medium">{objKey}</Label>
                <Input
                  value={
                    typeof objValue === "string"
                      ? objValue
                      : JSON.stringify(objValue)
                  }
                  onChange={(e) => {
                    let newValue = e.target.value;
                    // Try to parse as JSON if it looks like JSON, otherwise keep as string
                    try {
                      if (
                        newValue.startsWith("{") ||
                        newValue.startsWith("[")
                      ) {
                        newValue = JSON.parse(newValue);
                      }
                    } catch {
                      // Keep as string if JSON parsing fails
                    }
                    handleArrayObjectUpdate(key, index, objKey, newValue);
                  }}
                  className="text-xs h-7 mt-1"
                  placeholder={`Enter ${objKey}`}
                />
              </div>
            ))}
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
          value={typeof item === "string" ? item : JSON.stringify(item)}
          onChange={(e) => handleArrayItemUpdate(key, index, e.target.value)}
          className="text-sm h-8"
          placeholder="Enter value"
        />
      </div>
    );
  };

  const renderArrayItemBySchema = (
    item: any,
    key: string,
    index: number,
    itemSchema: any
  ) => {
    if (!itemSchema) {
      // Fallback to existing key-based logic
      return renderArrayItem(item, key, index);
    }

    return (
      <div
        key={index}
        className="border border-border/50 rounded-md p-3 bg-muted/20 space-y-2"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium">
            {key.charAt(0).toUpperCase() + key.slice(1)} #{index + 1}
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleArrayItemRemove(key, index)}
            className="h-6 w-6 p-0 text-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>

        <div className="space-y-2">
          {Object.entries(itemSchema).map(
            ([fieldKey, fieldMeta]: [string, any]) => {
              const fieldValue = item[fieldKey] || "";

              switch (fieldMeta.type) {
                case "text":
                  return (
                    <div key={fieldKey}>
                      <Label className="text-xs font-medium">
                        {fieldMeta.label || fieldKey}
                      </Label>
                      <Input
                        value={fieldValue}
                        onChange={(e) =>
                          handleArrayObjectUpdate(
                            key,
                            index,
                            fieldKey,
                            e.target.value
                          )
                        }
                        className="text-xs h-7 mt-1"
                        placeholder={
                          fieldMeta.placeholder || `Enter ${fieldKey}...`
                        }
                      />
                    </div>
                  );

                case "textarea":
                  return (
                    <div key={fieldKey}>
                      <Label className="text-xs font-medium">
                        {fieldMeta.label || fieldKey}
                      </Label>
                      <Textarea
                        value={fieldValue}
                        onChange={(e) =>
                          handleArrayObjectUpdate(
                            key,
                            index,
                            fieldKey,
                            e.target.value
                          )
                        }
                        className="text-xs mt-1 min-h-[50px]"
                        placeholder={
                          fieldMeta.placeholder || `Enter ${fieldKey}...`
                        }
                      />
                    </div>
                  );

                case "select":
                  return (
                    <div key={fieldKey}>
                      <Label className="text-xs font-medium">
                        {fieldMeta.label || fieldKey}
                      </Label>
                      <Select
                        value={fieldValue}
                        onValueChange={(value) =>
                          handleArrayObjectUpdate(key, index, fieldKey, value)
                        }
                      >
                        <SelectTrigger className="text-xs h-7 mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldMeta.options?.map((option: any) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  );

                case "number":
                  return (
                    <div key={fieldKey}>
                      <Label className="text-xs font-medium">
                        {fieldMeta.label || fieldKey}
                      </Label>
                      <Input
                        type="number"
                        min={fieldMeta.min}
                        max={fieldMeta.max}
                        value={fieldValue}
                        onChange={(e) =>
                          handleArrayObjectUpdate(
                            key,
                            index,
                            fieldKey,
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="text-xs h-7 mt-1"
                        placeholder={
                          fieldMeta.placeholder || `Enter ${fieldKey}...`
                        }
                      />
                    </div>
                  );

                case "boolean":
                  return (
                    <div
                      key={fieldKey}
                      className="flex items-center space-x-2 pt-1"
                    >
                      <Switch
                        checked={fieldValue}
                        onCheckedChange={(checked) =>
                          handleArrayObjectUpdate(key, index, fieldKey, checked)
                        }
                      />
                      <Label className="text-xs font-medium">
                        {fieldMeta.label || fieldKey}
                      </Label>
                    </div>
                  );

                case "array":
                  // Handle nested arrays (like highlights in experience)
                  return (
                    <div key={fieldKey}>
                      <Label className="text-xs font-medium">
                        {fieldMeta.label || fieldKey}
                      </Label>
                      <div className="mt-1 space-y-1.5">
                        {Array.isArray(fieldValue)
                          ? fieldValue.map((subItem: any, subIndex: number) => (
                              <div
                                key={subIndex}
                                className="flex items-center space-x-1.5"
                              >
                                <Input
                                  value={subItem}
                                  onChange={(e) => {
                                    const newArray = [...fieldValue];
                                    newArray[subIndex] = e.target.value;
                                    handleArrayObjectUpdate(
                                      key,
                                      index,
                                      fieldKey,
                                      newArray
                                    );
                                  }}
                                  className="text-xs h-6 flex-1"
                                  placeholder={
                                    fieldMeta.placeholder ||
                                    `Enter ${fieldKey} item...`
                                  }
                                />
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    const newArray = fieldValue.filter(
                                      (_: any, i: number) => i !== subIndex
                                    );
                                    handleArrayObjectUpdate(
                                      key,
                                      index,
                                      fieldKey,
                                      newArray
                                    );
                                  }}
                                  className="h-6 w-6 p-0 text-destructive hover:text-destructive-foreground"
                                >
                                  <Trash2 className="w-2.5 h-2.5" />
                                </Button>
                              </div>
                            ))
                          : null}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const newArray = Array.isArray(fieldValue)
                              ? [...fieldValue, ""]
                              : [""];
                            handleArrayObjectUpdate(
                              key,
                              index,
                              fieldKey,
                              newArray
                            );
                          }}
                          className="w-full h-6 text-xs"
                        >
                          <Plus className="w-2.5 h-2.5 mr-1" />
                          Add {fieldMeta.label || fieldKey}
                        </Button>
                      </div>
                    </div>
                  );

                default:
                  return (
                    <div key={fieldKey}>
                      <Label className="text-xs font-medium">
                        {fieldMeta.label || fieldKey}
                      </Label>
                      <Input
                        value={fieldValue}
                        onChange={(e) =>
                          handleArrayObjectUpdate(
                            key,
                            index,
                            fieldKey,
                            e.target.value
                          )
                        }
                        className="text-xs h-7 mt-1"
                        placeholder={
                          fieldMeta.placeholder || `Enter ${fieldKey}...`
                        }
                      />
                    </div>
                  );
              }
            }
          )}
        </div>
      </div>
    );
  };

  const renderField = (field: FieldConfig) => {
    const { key, type } = field;
    const value = localData[key];

    if (type === "array") {
      const arrayValue = Array.isArray(value) ? value : [];
      return (
        <div key={key} className="mb-3 border border-border/50 rounded-md">
          <div className="px-3 py-2 border-b border-border/50 bg-muted/20">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{key}</span>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs px-2 py-0.5 h-5">
                  {arrayValue.length}
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleArrayItemAdd(key)}
                  className="h-6 px-2 text-xs"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </div>
          <div className="p-3">
            {arrayValue.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                <Plus className="w-6 h-6 mx-auto mb-1.5 opacity-50" />
                <p className="text-xs mb-2">No items yet</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleArrayItemAdd(key)}
                  className="h-6 text-xs px-3"
                >
                  Add First Item
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {arrayValue.map((item: any, index: number) => {
                  // Use schema-based rendering if available, otherwise fall back to key-based
                  const fieldMeta = field.metadata;
                  if (fieldMeta?.itemSchema) {
                    return renderArrayItemBySchema(
                      item,
                      key,
                      index,
                      fieldMeta.itemSchema
                    );
                  }
                  return renderArrayItem(item, key, index);
                })}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (type === "object") {
      const isExpanded = expandedSections.has(key);
      return (
        <div key={key} className="mb-3 border border-border/50 rounded-md">
          <div className="px-3 py-2 border-b border-border/50 bg-muted/20">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{key}</span>
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
                className="h-6 w-6 p-0"
              >
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </Button>
            </div>
          </div>
          {isExpanded && (
            <div className="p-3">
              <div className="space-y-2">
                {value &&
                  typeof value === "object" &&
                  Object.entries(value).map(([objKey, objValue]) => (
                    <div key={objKey}>
                      <Label className="text-xs font-medium">{objKey}</Label>
                      <Input
                        value={objValue as string}
                        onChange={(e) => {
                          const updatedValue = {
                            ...value,
                            [objKey]: e.target.value,
                          };
                          handleFieldUpdate(key, updatedValue);
                        }}
                        className="mt-1 text-xs h-7"
                        placeholder={`Enter ${objKey}`}
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    // Special handling for layoutMode dropdown
    if (key === "layoutMode") {
      return (
        <div key={key} className="mb-3 border border-border/50 rounded-md">
          <div className="px-3 py-2 border-b border-border/50 bg-muted/20">
            <span className="text-sm font-medium">Layout Mode</span>
          </div>
          <div className="p-3">
            <Select
              value={value || "list"}
              onValueChange={(newValue) => handleFieldUpdate(key, newValue)}
            >
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="list">List</SelectItem>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    }

    return (
      <div key={key} className="mb-3 border border-border/50 rounded-md">
        <div className="px-3 py-2 border-b border-border/50 bg-muted/20">
          <div className="flex items-center gap-2 justify-between">
            <span className="text-sm font-medium">
              {field.metadata?.label || key}
            </span>
            {(field.metadata?.label?.toLowerCase().includes("image") ||
              field.metadata?.label?.toLowerCase().includes("photo") ||
              field.metadata?.label?.toLowerCase().includes("picture") ||
              field.metadata?.label?.toLowerCase().includes("avatar") ||
              key.toLowerCase().includes("image") ||
              key.toLowerCase().includes("photo") ||
              key.toLowerCase().includes("picture") ||
              key.toLowerCase().includes("avatar")) && (
              <Button
                size="sm"
                variant="outline"
                className="h-6 px-2 text-xs"
                onClick={() => openImagePicker(key)}
              >
                <Smile className="w-3 h-3 mr-1" />
                Memoji
              </Button>
            )}
          </div>
          {field.metadata?.description && (
            <p className="text-xs text-muted-foreground mt-1">
              {field.metadata.description}
            </p>
          )}
        </div>
        <div className="p-3">
          {type === "boolean" ? (
            <div className="flex items-center gap-2">
              <Switch
                checked={value || false}
                onCheckedChange={(checked) => handleFieldUpdate(key, checked)}
              />
              <span className="text-xs text-muted-foreground">
                {value ? "Enabled" : "Disabled"}
              </span>
            </div>
          ) : type === "select" ? (
            <Select
              value={String(value || "")}
              onValueChange={(newValue) => {
                // Convert string values to appropriate types for specific fields
                if (key === "showStatus") {
                  handleFieldUpdate(key, newValue === "true");
                } else {
                  handleFieldUpdate(key, newValue);
                }
              }}
            >
              <SelectTrigger className="h-7 text-xs">
                <SelectValue
                  placeholder={
                    field.metadata?.placeholder || `Select ${key}...`
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {field.metadata?.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : type === "textarea" ? (
            <Textarea
              value={value || ""}
              onChange={(e) => handleFieldUpdate(key, e.target.value)}
              className="text-xs min-h-[60px]"
              placeholder={field.metadata?.placeholder || `Enter ${key}...`}
            />
          ) : (
            <Input
              value={value || ""}
              onChange={(e) => handleFieldUpdate(key, e.target.value)}
              className="text-xs h-7"
              placeholder={field.metadata?.placeholder || `Enter ${key}...`}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-2 w-full max-w-full">
      <div className="flex items-center gap-2">
        {saveStatus === "saving" && (
          <div className="flex items-center gap-1 text-amber-600">
            <Clock className="w-3 h-3 animate-spin" />
            <span className="text-xs">Saving...</span>
          </div>
        )}
        {saveStatus === "saved" && (
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircle className="w-3 h-3" />
            <span className="text-xs">Saved</span>
          </div>
        )}
        {saveStatus === "pending" && (
          <div className="flex items-center gap-1 text-blue-600">
            <Clock className="w-3 h-3" />
            <span className="text-xs">Pending</span>
          </div>
        )}
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
        <div className="space-y-4 pb-4 overflow-y-auto w-full max-w-full">
          {fieldConfigs.map(renderField)}
        </div>
      )}

      {/* Info Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Choose Image or Memoji</DialogTitle>
            <DialogDescription>
              Select a memoji from our collection or provide your own image URL
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="memoji" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="memoji" className="flex items-center gap-2">
                <Smile className="w-4 h-4" />
                Memoji Collection
              </TabsTrigger>
              <TabsTrigger value="url" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Image URL
              </TabsTrigger>
            </TabsList>

            <TabsContent value="memoji" className="mt-4">
              <SimpleMemojiPicker
                onSelect={handleMemojiSelect}
                selectedMemoji={selectedMemoji}
                className="border-0 shadow-none"
              />
            </TabsContent>

            <TabsContent value="url" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image-url">Image URL</Label>
                <Input
                  id="image-url"
                  placeholder="https://example.com/image.jpg"
                  value={
                    currentImageField ? localData[currentImageField] || "" : ""
                  }
                  onChange={(e) => {
                    if (currentImageField) {
                      handleFieldUpdate(currentImageField, e.target.value);
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  Paste a direct link to your image. Make sure it ends with
                  .jpg, .png, or .webp
                </p>
              </div>

              {/* Image preview */}
              {currentImageField && localData[currentImageField] && (
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <img
                      src={localData[currentImageField]}
                      alt="Preview"
                      className="max-w-full h-32 object-contain mx-auto rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="bg-muted/50 rounded-lg p-4 border">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Free Image Hosting Services
                </h4>

                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2 p-3 bg-background rounded-md border">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap">
                        Imgur
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <a
                        href="https://imgur.com/upload"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
                      >
                        imgur.com/upload
                      </a>
                      <span className="text-muted-foreground text-sm">
                        {" "}
                        - Free, no account needed
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 p-3 bg-background rounded-md border">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap">
                        Unsplash
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <a
                        href="https://unsplash.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
                      >
                        unsplash.com
                      </a>
                      <span className="text-muted-foreground text-sm">
                        {" "}
                        - Free stock photos
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>Done</Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
