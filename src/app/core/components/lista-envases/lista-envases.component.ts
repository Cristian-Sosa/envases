import { Component, OnInit, inject } from '@angular/core';
import { EnvasesService } from '../../../shared/services';
import { Envase } from '../../../shared/models';
import { NgFor, NgIf } from '@angular/common';
import { CardComponent } from '../../../shared';

@Component({
  selector: 'app-lista-envases',
  standalone: true,
  imports: [NgFor, NgIf, CardComponent],
  templateUrl: './lista-envases.component.html',
  styleUrls: ['./lista-envases.component.sass'],
})
export class ListaEnvasesComponent implements OnInit {
  constructor(private envaseSrv: EnvasesService) {}

  public envases: Envase[] = [];
  public isCarga: boolean = false;

  ngOnInit(): void {
    this.envaseSrv.getCargaEnvasesObservable().subscribe({
      next: (cargaEnvases) => {
        this.envases = cargaEnvases;
        this.isCarga = cargaEnvases.length > 0
      },
      error: () => {
        this.envases = [];
        throw new Error('Error obteniendo carga');
      },
    });
  }
}
