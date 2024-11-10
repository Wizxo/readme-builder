import { SocialLinksConfig } from './links';
import { ContactConfig } from './contact';
import { ProfileViewsConfig } from './views';

export const socialComponents = {
  SocialLinks: SocialLinksConfig,
  Contact: ContactConfig,
  ProfileViews: ProfileViewsConfig
} as const;