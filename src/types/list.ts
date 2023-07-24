export enum ListItemType {
  Entity = "entity",
  Link = "link",
  Source = "source",
}

export interface ListItem {
  key: string;
  type: ListItemType;
  name: string;
  url?: string;
  icon: JSX.Element;
  iconColor?: string;
  onClick?: () => void;
}
