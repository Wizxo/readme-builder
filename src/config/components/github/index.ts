import { BadgeConfig } from './badge';
import { StatsConfig } from './stats';
import { LanguagesConfig } from './languages';
import { ContributionsConfig } from './contributions';
import { AlertConfig } from './alert';
import { ReferenceConfig } from './reference';
import { WorkflowBadgesConfig } from './workflow-badges';
import { TrophiesConfig } from './trophies';
import { ProfileViewsConfig } from './profile-views';

export const githubComponents = {
  Badge: BadgeConfig,
  Stats: StatsConfig,
  Languages: LanguagesConfig,
  Contributions: ContributionsConfig,
  Alert: AlertConfig,
  Reference: ReferenceConfig,
  WorkflowBadges: WorkflowBadgesConfig,
  Trophies: TrophiesConfig,
  ProfileViews: ProfileViewsConfig
} as const;