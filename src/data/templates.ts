export const templates = [
  {
    id: 'basic',
    name: 'Basic Project',
    description: 'Simple project template with essential sections',
    components: [
      { type: 'Headings', content: 'Project Name', config: { level: '1', alignment: 'center' } },
      { type: 'Text', content: 'Brief description of your project', config: { style: 'normal' } },
      { type: 'Images', content: 'https://shields.io/badge/status-active-success', config: { size: 'small' } },
      { type: 'Headings', content: 'Installation', config: { level: '2' } },
      { type: 'Text', content: 'Installation steps...', config: { style: 'code' } },
      { type: 'Headings', content: 'Usage', config: { level: '2' } },
      { type: 'Text', content: 'How to use...', config: { style: 'normal' } },
    ]
  },
  {
    id: 'portfolio',
    name: 'Developer Portfolio',
    description: 'Showcase your skills and projects',
    components: [
      // ... similar structure
    ]
  }
]; 