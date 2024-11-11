export const techStackConfig = {
  languages: {
    typescript: {
      name: 'TypeScript',
      color: '%23007ACC',
      logo: 'typescript',
      logoColor: 'white'
    },
    // ... rest of languages
  },
  frameworks: {
    react: {
      name: 'React',
      color: '%2361DAFB',
      logo: 'react',
      logoColor: '%23000000'
    },
    // ... rest of frameworks
  },
  // ... rest of categories
};

export function getTechConfig(techKey: string) {
  if (!techKey) return null;
  
  for (const category of Object.values(techStackConfig)) {
    if (category[techKey]) {
      return category[techKey];
    }
  }
  return {
    name: techKey,
    color: '%23333333',
    logo: 'code',
    logoColor: 'white'
  };
}

export function updateTechnologyOptions(category: string) {
  const technologies = techStackConfig[category] || {};
  return Object.entries(technologies).map(([value, tech]) => ({
    value,
    label: tech.name
  }));
} 