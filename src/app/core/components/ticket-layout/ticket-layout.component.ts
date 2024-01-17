import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as JsBarcode from 'jsbarcode';
import { EnvasesService } from '../../../shared/services';
import { NgFor, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-ticket-layout',
  standalone: true,
  imports: [UpperCasePipe, NgFor],
  templateUrl: './ticket-layout.component.html',
  styleUrls: ['./ticket-layout.component.sass'],
})
export class TicketLayoutComponent implements OnInit, OnChanges {
  // private valeService = inject(ValeService);

  constructor(private envaseSrv: EnvasesService) {}

  public envases: any = [];

  private ean: string = '';

  @Input() cabecera!: {
    fecha: string;
    usuario: string | undefined;
    ticket: string;
  };

  ngOnInit(): void {
    this.envaseSrv.getCargaEnvasesObservable().subscribe({
      next: (envases) => {
        this.envases = envases;
      },
      error: (err) => {
        this.envases = [];
      },
    });
    // this.valeService.getEAN().subscribe((res) => {
    //   this.ean = res;
    //   console.log(this.ean);
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.generateEAN13Barcode();
  }

  // generateEAN13Barcode = () => {
  //   console.log(this.ean);
  //   JsBarcode('#barcode', this.ean, {
  //     format: 'EAN13',
  //     lineColor: '#333',
  //     width: 1.5,
  //     height: 20,
  //     displayValue: true,
  //   });
  // };
}
