export type FileSource = 'imported' | 'created' | 'template';

export interface Tab {
  id: string;
  name: string;
  content: string;
  savedContent: string;
  source: FileSource;
  updatedAt: string;
}

export interface RecentFile {
  id: string;
  name: string;
  content: string;
  source: FileSource;
  updatedAt: string;
}
