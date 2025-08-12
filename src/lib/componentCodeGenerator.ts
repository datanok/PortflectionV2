import fs from 'fs/promises';
import path from 'path';
import { ApprovedComponent } from '@prisma/client';

export interface ComponentCodeValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  propsSchema?: Record<string, any>;
}

export interface GeneratedComponentFile {
  filePath: string;
  componentCode: string;
  metadata: {
    originalId: string;
    name: string;
    description: string;
    author: string;
    version: string;
    propsSchema?: Record<string, any>;
  };
}

// Dangerous patterns to block
const DANGEROUS_PATTERNS = [
  /eval\s*\(/,
  /Function\s*\(/,
  /new\s+Function\s*\(/,
  /window\./,
  /document\./,
  /localStorage\./,
  /sessionStorage\./,
  /importScripts\s*\(/,
  /require\s*\(/,
  /__dirname/,
  /__filename/,
  /process\./,
  /global\./,
  /module\./,
  /exports\./,
  /console\.log\s*\(/,
  /console\.warn\s*\(/,
  /console\.error\s*\(/,
  /alert\s*\(/,
  /confirm\s*\(/,
  /prompt\s*\(/,
];

// Required patterns for valid React components
const REQUIRED_PATTERNS = [
  /function\s+\w+\s*\(/,
  /const\s+\w+\s*=\s*\(/,
  /const\s+\w+\s*=\s*function/,
  /export\s+default/,
];

// Extract props interface from component code
function extractPropsSchema(componentCode: string): Record<string, any> | undefined {
  const propsMatch = componentCode.match(/interface\s+(\w+)Props\s*\{([^}]+)\}/);
  if (!propsMatch) return undefined;
  
  const propsInterface = propsMatch[2];
  const props: Record<string, any> = {};
  
  // Simple prop extraction - in production you'd want a proper TypeScript parser
  const propLines = propsInterface.split('\n').filter(line => line.includes(':'));
  
  for (const line of propLines) {
    const propMatch = line.match(/(\w+)\s*:\s*([^;]+)/);
    if (propMatch) {
      const [, propName, propType] = propMatch;
      props[propName.trim()] = propType.trim();
    }
  }
  
  return props;
}

// Validate component code for security and correctness
export function validateComponentCode(componentCode: string): ComponentCodeValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check for dangerous patterns
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(componentCode)) {
      errors.push(`Dangerous pattern detected: ${pattern.source}`);
    }
  }
  
  // Check for required React patterns
  const hasRequiredPattern = REQUIRED_PATTERNS.some(pattern => pattern.test(componentCode));
  if (!hasRequiredPattern) {
    errors.push('Component must be a valid React function component with export default');
  }
  
  // Check for proper imports
  if (!componentCode.includes('import React') && !componentCode.includes('import {') && !componentCode.includes('import * as React')) {
    warnings.push('Consider importing React explicitly for better compatibility');
  }
  
  // Extract props schema
  const propsSchema = extractPropsSchema(componentCode);
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    propsSchema,
  };
}

// Sanitize and format component code
export function sanitizeComponentCode(componentCode: string): string {
  let sanitized = componentCode
    // Remove any existing "use client" directives (we'll add our own)
    .replace(/^["']use client["'];?\s*$/gm, '')
    .replace(/^["']use server["'];?\s*$/gm, '')
    // Normalize line endings
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    // Remove extra whitespace
    .trim();
  
  // Add "use client" directive at the top
  sanitized = `"use client";\n\n${sanitized}`;
  
  return sanitized;
}

// Generate a safe component filename
export function generateComponentFilename(componentName: string): string {
  return componentName
    .replace(/[^a-zA-Z0-9]/g, '')
    .replace(/^(\d)/, '_$1') // Ensure it doesn't start with a number
    + '.tsx';
}

// Generate the component file content
export function generateComponentFile(component: ApprovedComponent): GeneratedComponentFile {
  const validation = validateComponentCode(component.componentCode);
  
  if (!validation.isValid) {
    throw new Error(`Invalid component code: ${validation.errors.join(', ')}`);
  }
  
  const sanitizedCode = sanitizeComponentCode(component.componentCode);
  const filename = generateComponentFilename(component.name);
  const filePath = `src/components/community/${filename}`;
  
  return {
    filePath,
    componentCode: sanitizedCode,
    metadata: {
      originalId: component.id,
      name: component.name,
      description: component.description,
      author: component.authorName,
      version: component.version,
      propsSchema: validation.propsSchema,
    },
  };
}

// Write component file to disk
export async function writeComponentFile(generatedFile: GeneratedComponentFile): Promise<void> {
  const { filePath, componentCode } = generatedFile;
  
  // Ensure the community directory exists
  const dirPath = path.dirname(filePath);
  await fs.mkdir(dirPath, { recursive: true });
  
  // Write the component file
  await fs.writeFile(filePath, componentCode, 'utf-8');
}

// Delete component file from disk
export async function deleteComponentFile(componentId: string, componentName: string): Promise<void> {
  const filename = generateComponentFilename(componentName);
  const filePath = `src/components/community/${filename}`;
  
  try {
    await fs.unlink(filePath);
  } catch (error) {
    // File might not exist, which is fine
    console.warn(`Could not delete component file ${filePath}:`, error);
  }
}

// Update component file (delete old, write new)
export async function updateComponentFile(component: ApprovedComponent): Promise<void> {
  // Delete existing file if it exists
  await deleteComponentFile(component.id, component.name);
  
  // Generate and write new file
  const generatedFile = generateComponentFile(component);
  await writeComponentFile(generatedFile);
} 