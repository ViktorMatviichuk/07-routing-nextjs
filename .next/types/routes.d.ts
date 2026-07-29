type AppRoutes = "/" | "/notes/[id]" | "/notes/filter/[...slug]";
type PageRoutes = never;
type LayoutRoutes = "/" | "/notes/filter";
type RedirectRoutes = never;
type RewriteRoutes = never;
type Routes =
  | AppRoutes
  | PageRoutes
  | LayoutRoutes
  | RedirectRoutes
  | RewriteRoutes;

interface ParamMap {
  "/": {};
  "/notes/[id]": { id: string };
  "/notes/filter": {};
  "/notes/filter/[...slug]": { slug: string[] };
}

export type ParamsOf<Route extends Routes> = ParamMap[Route];

interface LayoutSlotMap {
  "/": "modal";
  "/notes/filter": "sidebar";
}

export type {
  AppRoutes,
  PageRoutes,
  LayoutRoutes,
  RedirectRoutes,
  RewriteRoutes,
  ParamMap,
};

declare global {
  interface PageProps<AppRoute extends AppRoutes> {
    params: Promise<ParamMap[AppRoute]>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
  }

  type LayoutProps<LayoutRoute extends LayoutRoutes> = {
    params: Promise<ParamMap[LayoutRoute]>;
    children: React.ReactNode;
  } & {
    [K in LayoutSlotMap[LayoutRoute]]: React.ReactNode;
  };
}
