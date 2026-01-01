import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, unlinkSync } from 'node:fs';
import { extname, join } from 'node:path';

export type EntityType = 'books' | 'authors' | 'users';

@Injectable()
export class UploadService {
  private readonly baseUploadPath = join(process.cwd(), 'uploads');

  constructor() {
    // Ensure base upload directory exists
    if (!existsSync(this.baseUploadPath)) {
      mkdirSync(this.baseUploadPath, { recursive: true });
    }
  }

  /**
   * Get the upload directory path for a specific entity type
   */
  getUploadPath(entityType: EntityType): string {
    const path = join(this.baseUploadPath, entityType);
    
    // Ensure entity-specific directory exists
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }
    
    return path;
  }

  /**
   * Generate a unique filename for the uploaded file
   * @param file - The uploaded file
   * @param entityType - The type of entity (books, authors, etc.)
   * @param prefix - Optional custom prefix, defaults to entityType singular
   */
  generateFileName(
    file: Express.Multer.File,
    entityType: EntityType,
    prefix?: string,
  ): string {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = extname(file.originalname);
    const filePrefix = prefix || entityType.slice(0, -1); // Remove 's' from plural
    return `${filePrefix}-${uniqueSuffix}${ext}`;
  }

  /**
   * Delete a file from the upload directory
   */
  deleteFile(filename: string, entityType: EntityType): void {
    try {
      const filePath = join(this.getUploadPath(entityType), filename);
      if (existsSync(filePath)) {
        unlinkSync(filePath);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

  /**
   * Get the public URL for an uploaded file
   */
  getFileUrl(filename: string, entityType: EntityType): string {
    return `/uploads/${entityType}/${filename}`;
  }

  /**
   * Get the full URL (with base URL) for an uploaded file
   */
  getFullFileUrl(filename: string, entityType: EntityType): string {
    const baseUrl = process.env.APP_URL || 'http://localhost:3001';
    return `${baseUrl}/uploads/${entityType}/${filename}`;
  }

  /**
   * Extract filename and entity type from URL
   */
  parseFileUrl(url: string): { filename: string; entityType: string } | null {
    const match = url.match(/\/uploads\/([^/]+)\/(.+)$/);
    if (!match) return null;
    
    return {
      entityType: match[1],
      filename: match[2],
    };
  }

  /**
   * Get allowed file types for validation
   */
  getAllowedMimeTypes(type: 'image' | 'document' | 'all' = 'image'): RegExp {
    switch (type) {
      case 'image':
        return /\/(jpg|jpeg|png|gif|webp)$/;
      case 'document':
        return /\/(pdf|doc|docx)$/;
      case 'all':
        return /\/(jpg|jpeg|png|gif|webp|pdf|doc|docx)$/;
      default:
        return /\/(jpg|jpeg|png|gif|webp)$/;
    }
  }

  /**
   * Get file size limit in bytes
   */
  getFileSizeLimit(entityType: EntityType): number {
    // Different limits for different entities if needed
    switch (entityType) {
      case 'books':
      case 'authors':
        return 5 * 1024 * 1024; // 5MB
      case 'users':
        return 2 * 1024 * 1024; // 2MB
      default:
        return 5 * 1024 * 1024; // 5MB default
    }
  }
}
