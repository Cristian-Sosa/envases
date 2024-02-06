import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './core/components';
import { HttpClientModule } from '@angular/common/http';
import {
  AuthService,
  DbService,
  EnvasesService,
  ValeService,
  WebConectionService,
} from './shared/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterOutlet, ToolbarComponent],
  providers: [
    AuthService,
    EnvasesService,
    ValeService,
    DbService,
    WebConectionService,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {}
