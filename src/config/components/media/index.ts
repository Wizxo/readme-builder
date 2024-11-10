import { ImageConfig } from './image';
import { VideoConfig } from './video';

export const mediaComponents = {
  Image: ImageConfig,
  Video: VideoConfig
} as const; 