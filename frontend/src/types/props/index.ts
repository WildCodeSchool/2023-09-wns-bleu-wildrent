import { Column, Option, TableRow } from '..';

export interface LinkProps {
  href: string;
  text: string;
  testId?: string;
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
  edit?: (id: number) => void;
  create?: () => void;
};

export type AdminTableRowProps = {
  row: TableRow;
  edit?: (id: number) => void;
  remove?: (id: number) => void;
};

export type AdminTableModalProps = {
  fields: FormInputProps[];
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editionMode?: boolean;
  id?: number;
};
