export interface ListItem {
  key: string;
  name: string;
  url?: string;
  icon: JSX.Element;
  onClick?: () => void;
}
