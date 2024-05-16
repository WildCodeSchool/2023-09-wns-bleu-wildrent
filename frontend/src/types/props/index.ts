import { Column, Option, TableRow } from '..';

export interface LinkProps {
  href: string;
  text: string;
}

export type FormInputProps = {
  label: string;
  id: string;
  placeholder: string;
  inputType?: string;
  error?: string;
  options?: Option[];
};

export type AdminTableProps = {
  columns: Column[];
  dataset: TableRow[];
  remove?: (id: number) => void;
  edit?: (data: any) => Promise<void>;
  create?: () => void;
};

export type AdminTableRowProps = {
  row: TableRow;
  edit?: (data: any) => Promise<void>;
  setEditionMode: React.Dispatch<React.SetStateAction<boolean>>;
  editionMode: boolean;
  remove?: (id: number) => void;
};

export type AdminTableModalProps = {
  fields: FormInputProps[];
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
