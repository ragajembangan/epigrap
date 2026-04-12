import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server';
import { defineMiddleware, sequence } from 'astro:middleware';

const isDashboardRoute = createRouteMatcher(['/dasbor(.*)']);

const clerkAuth = clerkMiddleware((auth, context) => {
  const { isAuthenticated, redirectToSignIn } = auth();

  if (isDashboardRoute(context.request) && !isAuthenticated) {
    return redirectToSignIn();
  }
});

// Wrapper untuk menangani error "Can't modify immutable headers" 
// yang terjadi di Cloudflare Workers runtime
const safeClerkAuth = defineMiddleware(async (context, next) => {
  try {
    // Cast hasil eksekusi clerkAuth ke Response untuk mematuhi MiddlewareHandler Astro
    return (await clerkAuth(context, next)) as Response;
  } catch (err: any) {
    if (err?.message?.includes('immutable')) {
      // Clerk gagal set header di runtime Cloudflare, lanjutkan tanpa auth
      return next();
    }
    throw err;
  }
});

export const onRequest = safeClerkAuth;
