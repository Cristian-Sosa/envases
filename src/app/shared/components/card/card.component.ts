import { Component, Input, inject } from '@angular/core';
import { EnvasesService } from '../../services';
import { Envase } from '../../models';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent {
  constructor(private envaseSrv: EnvasesService) {}

  public remove: boolean = false;

  @Input() card!: Envase;

  removeEnvase = (): void => {
    this.remove = true;
    let interval = setInterval(() => {
      this.envaseSrv.removeEnvase(this.card);
      clearInterval(interval);
    }, 250);
  };
}
