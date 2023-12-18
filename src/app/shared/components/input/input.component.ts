import { Component, Input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IInput } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.sass',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent {
  @Input() content!: IInput;

  public inputContent: string = '';

  private _onChange: Function = (_value: any) => {};
  private _onTouch: Function = (_value: any) => {};

  changeValue = (event: Event) =>
    this._onChange((<HTMLInputElement>event.target).value);

  writeValue(obj: any): void {
    this.inputContent = obj;
  }

  registerOnChange(fn: Function): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }
}
