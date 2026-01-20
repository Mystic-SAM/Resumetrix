import { useEffect, useState } from "react";
import { Link } from "react-router";
import { usePuterStore } from "~/hooks/usePuterStore";
import { useResumeStore } from "~/hooks/useResumeStore";
import ConfirmModal from "./ConfirmModal";
import ScoreCircle from "./ScoreCircle";

const ResumeCard = ({ resume }: { resume: Resume }) => {
  const { id, companyName, jobTitle, feedback, imagePath, resumePath } = resume;
  const { fs, kv } = usePuterStore();
  const { deleteResume, imageUrlMap, setImageUrl, revokeImageUrl } = useResumeStore();
  const [resumeImgUrl, setResumeImgUrl] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isImgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    // If image is already cached, use it immediately
    if (imageUrlMap[imagePath]) {
      setResumeImgUrl(imageUrlMap[imagePath]);
      return;
    }

    let isActive = true;

    (async () => {
      try {
        const blob = await fs.read(imagePath);
        if (!blob || !isActive) return;

        const url = URL.createObjectURL(blob);

        // Cache it
        setImageUrl(imagePath, url);

        // Only update local state if this effect is still current
        if (isActive) setResumeImgUrl(url);
      } catch (err) {
        console.error("Failed to load resume image:", err);
      }
    })();

    return () => {
      isActive = false;
    };
  }, [imagePath, imageUrlMap, setImageUrl]);

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setModalOpen(true);
  };

  const handleResumeDelete = async () => {
    await Promise.all([
      fs.delete(resumePath),
      fs.delete(imagePath),
    ]);
    await kv.delete(`resume:${id}`);
    revokeImageUrl(imagePath);
    deleteResume(id);
    setModalOpen(false);
  }

  const modalActions: ModalAction[] = [
    {
      buttonText: "Cancel",
      buttonType: "neutral",
      onClick: () => setModalOpen(false),
    },
    {
      buttonText: "Delete",
      buttonType: "negative",
      onClick: handleResumeDelete,
    },
  ]

  return (
    <>
      <Link
        to={`/resume/${id}`}
        className="resume-card animate-in fade-in duration-1000"
      >
        <div className="resume-card-header">
          <div className="flex flex-col gap-2">
            {companyName ? (
              <h2 className="text-black! font-bold wrap-break-word">
                {companyName}
              </h2>
            ) : (
              <h2 className="text-black! font-bold">Resume</h2>
            )
            }
            {jobTitle && (
              <h3 className="text-lg wrap-break-word text-gray-500">
                {jobTitle}
              </h3>
            )}
          </div>
          <div className="flex max-xs:relative max-xs:w-full max-xs:justify-center">
            <div className="flex-shrink-0">
              <ScoreCircle score={feedback.overallScore} />
            </div>
            <button
              onClick={handleDeleteClick}
              className="
                flex items-center justify-center rounded-full
                bg-white
                shadow-md
                w-7 h-7
                max-xs:absolute max-xs:top-[10px] max-xs:right-0
              "
              aria-label="Delete resume"
              title="Delete Resume"
            >
              <img src="/icons/trash.svg" alt="" className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="gradient-border animate-in fade-in duration-1000">
          <div className=" w-full h-full">
            {(!isImgLoaded && !resumeImgUrl) ? (
              <div className="animate-pulse bg-slate-200 rounded h-[350px] max-sm:h-[280px]" />
            ) : (
              <img
                src={resumeImgUrl}
                alt="resume"
                className="w-full h-[350px] max-sm:h-[280px] object-cover object-top"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgLoaded(true)}
                ref={img => { (img && img.complete) && setImgLoaded(true) }}
              />
            )}
          </div>
        </div>
      </Link>
      <ConfirmModal
        isOpen={isModalOpen}
        title="Delete Resume"
        description="Are you sure you want to delete this resume? This action cannot be undone."
        onClose={() => setModalOpen(false)}
        actions={modalActions}
      />
    </>
  );
};

export default ResumeCard;