import { renderApplication } from '@angular/platform-server';
import { AppComponent } from './app/app.component';
import { config as serverAppConfig } from './app/app.config.server';
import { bootstrapApplication } from '@angular/platform-browser';
import express from 'express';
import { join } from 'path';
import 'zone.js/node';
import { enableProdMode } from '@angular/core';

// Включаем продакшн-режим Angular
enableProdMode();

const app = express();
const port = process.env['PORT'] || 4000;

// Статика Angular
app.use(
  express.static(join(process.cwd(), 'browser'), {
    maxAge: '1y',
    index: false,
    redirect: false
  })
);

// Функция проверки динамических маршрутов
function shouldSkipSSR(url: string): boolean {
  const skipSSRPaths = [
    '/event-registration/', // динамический маршрут
    '/admin/modules/'
  ];
  return skipSSRPaths.some(path => url.startsWith(path));
}

// Обработка всех запросов
app.get(/.*/, async (req, res) => {
  try {
    // Пропускаем SSR для динамических страниц
    if (shouldSkipSSR(req.url)) {
      return res.sendFile(join(process.cwd(), 'browser', 'index.html'));
    }

    // SSR для статических страниц
    const html = await renderApplication(() =>
        bootstrapApplication(AppComponent, serverAppConfig), {
        document: '<app-root></app-root>',
        url: req.url
      }
    );

    res.status(200).set('Content-Type', 'text/html').send(html);

  } catch (error) {
    console.error('Rendering error:', error);
    // fallback на клиентскую сборку
    res.sendFile(join(process.cwd(), 'browser', 'index.html'));
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
