export interface IInput {
  label: string;
  type: 'text' | 'password' | 'number';
  name: string;
}

export interface IInputRadio {
  title: string;
  options: IRadioOption[];
}

export interface IRadioOption {
  id: string;
  title: string;
  name: string;
}

export interface ISelect {
  name: string;
  options: Array<{ value: number; description: string }>;
}
