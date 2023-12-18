export interface IButton {
  type: 'sumbit' | 'button' | 'reset';
  text: string;
  isPrimary: boolean;
  isDisabled: boolean;
}
