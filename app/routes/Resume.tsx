import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import Summary from "~/components/Summary";
import { usePuterStore } from "~/hooks/usePuterStore";
import { useResumeStore } from "~/hooks/useResumeStore";

export const meta = () => ([
  { title: 'Resumetrix | Resume Review ' },
  { name: 'description', content: 'Detailed overview of your resume' },
])

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { imageUrlMap, setImageUrl } = useResumeStore();
  const { id } = useParams();
  const [resumeImgUrl, setResumeImgUrl] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate('/auth', {
        state: { from: location.pathname },
        replace: true
      });
    }
  }, [isLoading, auth.isAuthenticated]);

  const loadResume = async () => {
    const resume = await kv.get(`resume:${id}`);

    if (!resume) return;

    const data = JSON.parse(resume);

    const resumeBlob = await fs.read(data.resumePath);
    if (!resumeBlob) return;

    const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
    const resumeUrl = URL.createObjectURL(pdfBlob);
    setResumeUrl(resumeUrl);

    if (imageUrlMap[data.imagePath]) {
      setResumeImgUrl(imageUrlMap[data.imagePath]);
    } else {
      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const resImgUrl = URL.createObjectURL(imageBlob);
      setResumeImgUrl(resImgUrl);
      setImageUrl(data.imagePath, resImgUrl);
    }

    setFeedback(data.feedback);
  }

  useEffect(() => {
    loadResume();
  }, [id]);

  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link to="/" className="back-button" aria-label="Back to Homepage">
          <img src="/icons/back.svg" alt="logo" className="h-4 w-4 sm:w-2.5 sm:h-2.5" />
          <span className="text-gray-800 text-sm font-semibold hidden sm:block">Back to Homepage</span>
        </Link>
        <h2 className="text-4xl !text-black font-bold flex-1 text-center">Resume Review</h2>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg') bg-cover h-[100vh] sticky top-0 items-center justify-center">
          {resumeImgUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit shadow-lg border-1 border-gray-200">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={resumeImgUrl}
                  className="w-full h-full object-contain rounded-2xl"
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>
        <section className="feedback-section">
          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              <Summary feedback={feedback} />
              <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
              <Details feedback={feedback} />
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" className="w-full" />
          )}
        </section>
      </div>
    </main>
  )
}
export default Resume;