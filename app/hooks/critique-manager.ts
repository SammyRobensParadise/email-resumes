import { UserProfile, useUser } from '@auth0/nextjs-auth0';

export type CritiqueConfig = {
  critique_resume: boolean;
  critique_website: boolean;
  resume?: File;
  website_url?: string;
  description: string;
  author: UserProfile;
};

export interface useCritiqueManagerInterface {
  createCritique: (config: CritiqueConfig, callback?: (response?: Response) => void) => void;
}

export default function useCritiqueManager(): useCritiqueManagerInterface {
  function createCritique(config: CritiqueConfig, callback?: (response?: Response) => void) {
    if (config?.author?.sub) {
      fetch('/api/critique/create', { method: 'POST', body: JSON.stringify(config) })
        .then((response) => {
          if (callback) callback(response);
        })
        .catch((error) => {});
    }
  }
  return { createCritique };
}
