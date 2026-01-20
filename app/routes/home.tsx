import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/hooks/usePuterStore";
import { useResumeStore } from "~/hooks/useResumeStore";
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

const Home = () => {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { resumes, setResumes } = useResumeStore();
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/auth', {
        state: { from: location.pathname },
        replace: true
      });
    }
  }, [auth.isAuthenticated]);

  const loadResumes = async () => {
    setLoadingResumes(true);

    const resumeList = (await kv.list('resume:*', true)) as KVItem[];

    const parsedResumes = resumeList?.map((resume) => (
      JSON.parse(resume.value) as Resume
    ));

    setResumes(parsedResumes || []);
    setLoadingResumes(false);
  }

  useEffect(() => {
    if (resumes?.length === 0) {
      loadResumes();
    }
  }, []);

  return (
    <main className="main-page bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-8">
          <h1>Track Your Applications & Resume Ratings</h1>
          {!loadingResumes && resumes?.length === 0 ? (
            <h2>No resumes found. Upload your first resume to get feedback.</h2>
          ) : (
            <h2>Review your submissions and check AI-powered feedback.</h2>
          )}
        </div>
        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
        )}
        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;