export interface ChartCardPropsInterface {
  title: string;
  children: React.ReactNode; // This allows any valid React element, including strings, JSX, etc.
  filter?: React.ReactNode; // Optional filter element
  className?: string; // Optional className for custom styling
}

export interface CardHeaderPropsInterface {
  title: string;
  filter?: React.ReactNode; // filter is optional, and it can be any React element (e.g., JSX)
}