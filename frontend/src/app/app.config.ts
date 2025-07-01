import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { authInterceptor } from './interceptors/auth.interceptor';
import { routes } from '../app/app.routes';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig['providers'] = [
  provideRouter(routes),
  provideHttpClient(withInterceptors([authInterceptor]))
];