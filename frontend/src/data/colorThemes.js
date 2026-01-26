export const colorThemes = [
  {
    id: 'blue',
    name: 'Professional Blue',
    primary: 'bg-blue-600',
    secondary: 'bg-blue-800',
    gradient: 'from-blue-600 to-blue-800',
    hover: 'hover:bg-blue-700',
    ring: 'ring-blue-500',
    border: 'border-blue-600',
    text: 'text-blue-600',
    bgLight: 'bg-blue-100'
  },
  {
    id: 'emerald',
    name: 'Modern Emerald',
    primary: 'bg-emerald-600',
    secondary: 'bg-emerald-800',
    gradient: 'from-emerald-600 to-emerald-800',
    hover: 'hover:bg-emerald-700',
    ring: 'ring-emerald-500',
    border: 'border-emerald-600',
    text: 'text-emerald-600',
    bgLight: 'bg-emerald-100'
  },
  {
    id: 'purple',
    name: 'Creative Purple',
    primary: 'bg-purple-600',
    secondary: 'bg-purple-800',
    gradient: 'from-purple-600 to-purple-800',
    hover: 'hover:bg-purple-700',
    ring: 'ring-purple-500',
    border: 'border-purple-600',
    text: 'text-purple-600',
    bgLight: 'bg-purple-100'
  },
  {
    id: 'indigo',
    name: 'Tech Indigo',
    primary: 'bg-indigo-600',
    secondary: 'bg-indigo-800',
    gradient: 'from-indigo-600 to-indigo-800',
    hover: 'hover:bg-indigo-700',
    ring: 'ring-indigo-500',
    border: 'border-indigo-600',
    text: 'text-indigo-600',
    bgLight: 'bg-indigo-100'
  },
  {
    id: 'rose',
    name: 'Elegant Rose',
    primary: 'bg-rose-600',
    secondary: 'bg-rose-800',
    gradient: 'from-rose-600 to-rose-800',
    hover: 'hover:bg-rose-700',
    ring: 'ring-rose-500',
    border: 'border-rose-600',
    text: 'text-rose-600',
    bgLight: 'bg-rose-100'
  },
  {
    id: 'teal',
    name: 'Fresh Teal',
    primary: 'bg-teal-600',
    secondary: 'bg-teal-800',
    gradient: 'from-teal-600 to-teal-800',
    hover: 'hover:bg-teal-700',
    ring: 'ring-teal-500',
    border: 'border-teal-600',
    text: 'text-teal-600',
    bgLight: 'bg-teal-100'
  },
  {
    id: 'orange',
    name: 'Bold Orange',
    primary: 'bg-orange-600',
    secondary: 'bg-orange-800',
    gradient: 'from-orange-600 to-orange-800',
    hover: 'hover:bg-orange-700',
    ring: 'ring-orange-500',
    border: 'border-orange-600',
    text: 'text-orange-600',
    bgLight: 'bg-orange-100'
  },
  {
    id: 'slate',
    name: 'Corporate Slate',
    primary: 'bg-slate-700',
    secondary: 'bg-slate-900',
    gradient: 'from-slate-700 to-slate-900',
    hover: 'hover:bg-slate-800',
    ring: 'ring-slate-500',
    border: 'border-slate-700',
    text: 'text-slate-700',
    bgLight: 'bg-slate-100'
  }
];

export const getTheme = (themeId = 'blue') => {
  return colorThemes.find(theme => theme.id === themeId) || colorThemes[0];
};
