import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "react-router";

import { useEffect } from "react";
import type { Route } from "./+types/root";
import "./app.css";
import { usePuterStore } from "./hooks/usePuterStore";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { init } = usePuterStore();
  useEffect(() => {
    init();
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <script src="https://js.puter.com/v2/"></script>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;
  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  const navigateHome = () => {
    navigate("/");
  }

  return (
    <main className="secondary-main bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg w-fit">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>{message}</h1>
            <p className="text-lg">{details}</p>
          </div>
          {stack && (
            <pre className="w-full p-4 overflow-x-auto">
              <code>{stack}</code>
            </pre>
          )}

          <div className="flex justify-center items-center">
            <button className="primary-button h-10 w-fit" onClick={navigateHome}>
              Go to Dashboard
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
