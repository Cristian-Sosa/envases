import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './core/components';
import { HttpClientModule } from '@angular/common/http';
import {
  AuthService,
  DbService,
  EnvasesService,
  LoaderService,
  ValeService,
  WebConnectionService,
} from './shared/services';
import { LoaderComponent } from './shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterOutlet,
    ToolbarComponent,
    LoaderComponent,
  ],
  providers: [
    AuthService,
    EnvasesService,
    ValeService,
    DbService,
    WebConnectionService,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent implements OnInit {
  public isLoading: boolean = false;

  constructor(private loaderSrv: LoaderService) {}

  ngOnInit(): void {
    this.loaderSrv
      .getLoaderStateObservable()
      .subscribe((res) => (this.isLoading = res));
  }
}
