import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/hooks/usePuterStore";

const ErrorPage = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  const title = state?.title || "Error";
  const errorMsg = state?.errorMsg || "An unexpected error occurred.";
  const stack = state?.stack;

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/auth', {
        state: { from: location.pathname },
        replace: true
      });
    }
  }, [auth.isAuthenticated]);

  const navigateHome = () => {
    navigate("/");
  }

  return (
    <main className="secondary-main bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg w-fit">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>{isLoading ? "Welcome" : title}</h1>
            {errorMsg && <p className="text-lg">{errorMsg}</p>}
          </div>
          {stack && (
            <pre className="w-full p-4 overflow-x-auto">
              <code>{stack}</code>
            </pre>
          )}
          <div className="flex justify-center items-center">
            {isLoading ? (
              <button className="primary-button animate-pulse h-10 w-fit">
                Signing you in...
              </button>
            ) : (
              <button className="primary-button h-10 w-fit" onClick={navigateHome}>
                Go to Dashboard
              </button>
            )
            }
          </div>
        </section>
      </div>
    </main>
  )
}

export default ErrorPage;
