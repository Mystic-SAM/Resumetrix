import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/hooks/usePuterStore";

export const meta = () => ([
  { title: 'Resumetrix | Auth' },
  { name: 'description', content: 'Log into your account' },
])

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const navigate = useNavigate();
  const redirectTo = location.state?.from;

  useEffect(() => {
    if (auth.isAuthenticated && redirectTo) {
      navigate(redirectTo, { replace: true });
    }
  }, [auth.isAuthenticated, redirectTo]);

  const navigateHome = () => {
    navigate("/");
  }

  return (
    <main className="auth-page bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg w-fit">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            {!isLoading && auth.isAuthenticated ?
              <>
                <h2>You are already logged in.</h2>
                <h2> Click on Home button to Continue Your Job Journey</h2>
              </>
              : <h2>Log In to Continue Your Job Journey</h2>
            }
          </div>
          <div className="flex gap-8 flex-wrap justify-center items-center">
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p>Signing you in...</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <>
                    <button className="auth-button" onClick={navigateHome}>
                      <p>Home</p>
                    </button>
                    <button className="auth-button" onClick={auth.signOut}>
                      <p>Log Out</p>
                    </button>
                  </>
                ) : (
                  <button className="auth-button" onClick={auth.signIn}>
                    <p>Log In</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Auth;