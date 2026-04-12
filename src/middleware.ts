import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server';

const isDashboardRoute = createRouteMatcher(['/dasbor(.*)']);

export const onRequest = clerkMiddleware((auth, context) => {
  const { isAuthenticated, redirectToSignIn } = auth();

  if (isDashboardRoute(context.request) && !isAuthenticated) {
    return redirectToSignIn();
  }
});
