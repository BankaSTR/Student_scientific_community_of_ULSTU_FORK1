import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Static pages (SEO-friendly prerender)
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'home', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'gallery', renderMode: RenderMode.Prerender },
  { path: 'support', renderMode: RenderMode.Prerender },
  { path: 'feedback', renderMode: RenderMode.Prerender },

  // Dynamic and protected routes (server render at request time)
  { path: 'results', renderMode: RenderMode.Server },
  { path: 'calendar', renderMode: RenderMode.Server },
  { path: 'event-registration/:id', renderMode: RenderMode.Server },

  // Auth
  { path: 'auth/signin', renderMode: RenderMode.Server },
  { path: 'auth/signup', renderMode: RenderMode.Server },
  { path: 'auth/student-login', renderMode: RenderMode.Server },
  { path: 'auth/admin-login', renderMode: RenderMode.Server },
  { path: 'auth/student-signup', renderMode: RenderMode.Server },
  { path: 'auth/login', renderMode: RenderMode.Server },
  { path: 'auth/register', renderMode: RenderMode.Server },

  // Admin area
  { path: 'admin', renderMode: RenderMode.Server },
  { path: 'admin/dashboard', renderMode: RenderMode.Server },
  { path: 'admin/help', renderMode: RenderMode.Server },
  { path: 'admin/modules/events', renderMode: RenderMode.Server },
  { path: 'admin/modules/clubs', renderMode: RenderMode.Server },
  { path: 'admin/modules/venues', renderMode: RenderMode.Server },
  { path: 'admin/modules/judges', renderMode: RenderMode.Server },
  { path: 'admin/modules/sponsors', renderMode: RenderMode.Server },
  { path: 'admin/modules/volunteers', renderMode: RenderMode.Server },
  { path: 'admin/modules/budgets', renderMode: RenderMode.Server },
  { path: 'admin/modules/departments', renderMode: RenderMode.Server },
  { path: 'admin/modules/results', renderMode: RenderMode.Server },
  { path: 'admin/modules/participations', renderMode: RenderMode.Server },
  { path: 'admin/modules/registrations', renderMode: RenderMode.Server },
  { path: 'admin/modules/feedbacks', renderMode: RenderMode.Server },
  { path: 'admin/modules/users', renderMode: RenderMode.Server },
  { path: 'admin/modules/admins', renderMode: RenderMode.Server },
  { path: 'admin/modules/comments', renderMode: RenderMode.Server },

  // Fallback wildcard (matches client '**' route); must be Server, not Prerender
  { path: '**', renderMode: RenderMode.Server }
];
