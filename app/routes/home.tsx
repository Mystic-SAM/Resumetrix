import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { resumes } from "~/constants";
import { usePuterStore } from "~/lib/puter";
import type { Route } from "./+types/Home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resumetrix | AI Resume Analyzer" },
    {
      name: "description",
      content: "Stop guessing, start interviewing. Resumetrix uses AI to score your resume against any job description. Instantly uncover hidden ATS keywords, measure role-specific compatibility, and receive precision feedback with actionable optimization tips — so you can boost your match rate and get noticed faster."
    },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/auth', {
        state: { from: location.pathname },
        replace: true
      });
    }
  }, [auth.isAuthenticated]);

  return (
    <main className="main-page bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2>Review your submissions and check AI-powered feedback.</h2>
        </div>
        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
