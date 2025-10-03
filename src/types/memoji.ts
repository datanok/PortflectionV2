export interface Memoji {
  id: number;
  name: string;
  fileName: string;
  category: string; // Made more flexible to handle any category
  tags: string[];
  faceCount: number;
  personCount: number;
  emotions: string[];
  genderClues: string[];
  url: string;
}

export interface MemojiPickerProps {
  onSelect: (memoji: Memoji) => void;
  selectedMemoji?: Memoji | null;
  className?: string;
  showSearch?: boolean;
  showCategories?: boolean;
  maxHeight?: string;
  gridCols?: number;
}

export interface MemojiFilters {
  category: string;
  search: string;
  tags: string[];
}

export type MemojiCategory = 'all' | string; // Made flexible to handle any category
