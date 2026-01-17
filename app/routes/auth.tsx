import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => ([
  { title: 'Resumetrix | Auth' },
  { name: 'description', content: 'Log into your account' },
])

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split('next=')[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next]);

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
                <h2>Already logged in.</h2>
                <h2> Click on Home button to go to home page</h2>
              </>
              : <h2>Log In to Continue Your Job Journey</h2>
            }
          </div>
          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p>Signing you in...</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <div className="flex gap-8 flex-wrap justify-center items-center">
                    <button className="auth-button" onClick={navigateHome}>
                      <p>Home</p>
                    </button>
                    <button className="auth-button" onClick={auth.signOut}>
                      <p>Log Out</p>
                    </button>
                  </div>
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

export default Auth