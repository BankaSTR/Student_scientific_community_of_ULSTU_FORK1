import { renderApplication } from '@angular/platform-server';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { bootstrapApplication } from '@angular/platform-browser';
import express from 'express';
import { join } from 'path';

// Enable production mode
import { enableProdMode } from '@angular/core';
enableProdMode();

const app = express();
const port = process.env['PORT'] || 4000;

// Serve static files
app.use(express.static(join(process.cwd(), 'browser'), {
  maxAge: '1y'
}));

// Handle all requests
app.get('*', async (req, res) => {
  try {
    const html = await renderApplication(() => bootstrapApplication(AppComponent, {
      ...appConfig,
      providers: [
        ...(appConfig.providers || []),
        provideRouter(routes)
      ]
    }), {
      document: '<app-root></app-root>',
      url: req.url
    });

    res.status(200).send(html);
  } catch (error) {
    console.error('Error during rendering:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
