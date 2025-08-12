// Test file to verify imports work
import { loadComponent, LoadedComponent } from './dynamicComponentLoader';
import { ComponentMetadata } from './componentRegistry';

export function testImports() {
  console.log('Imports working correctly');
  return { loadComponent, LoadedComponent, ComponentMetadata };
} 