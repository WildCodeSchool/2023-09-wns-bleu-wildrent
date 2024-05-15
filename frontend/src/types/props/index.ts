import { Option } from '..';

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
