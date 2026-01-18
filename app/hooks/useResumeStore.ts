// ~/hooks/useResumeStore.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ResumeState {
  resumes: Resume[];

  // in-memory cache only
  imageUrlMap: Record<string, string>;

  setResumes: (resumes: Resume[]) => void;
  addResume: (resume: Resume) => void;
  deleteResume: (id: string) => void;
  updateResume: (resume: Resume) => void;
  clearResumes: () => void;

  setImageUrl: (imagePath: string, url: string) => void;
  revokeImageUrl: (imagePath: string) => void;
};

export const useResumeStore = create<ResumeState>()(
  persist(
    (set, get) => ({
      resumes: [],
      imageUrlMap: {},

      setResumes: (resumes) => set({ resumes }),

      addResume: (resume) =>
        set((state) => ({ resumes: [...state.resumes, resume] })),

      deleteResume: (id) =>
        set((state) => ({
          resumes: state.resumes.filter((r) => r.id !== id),
        })),

      updateResume: (updated) =>
        set((state) => ({
          resumes: state.resumes.map((r) => (r.id === updated.id ? updated : r)),
        })),

      clearResumes: () => set({ resumes: [] }),

      setImageUrl: (imagePath, url) =>
        set((state) => ({
          imageUrlMap: {
            ...state.imageUrlMap,
            [imagePath]: url,
          },
        })),

      revokeImageUrl: (imagePath) => {
        const url = get().imageUrlMap[imagePath];
        if (url) URL.revokeObjectURL(url);

        set((state) => {
          const { [imagePath]: _, ...rest } = state.imageUrlMap;
          return { imageUrlMap: rest };
        });
      },
    }),
    {
      name: "resume-storage", // key in sessionStorage
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        resumes: state.resumes, // do NOT persist imageUrlMap
      }),
    }
  )
);
