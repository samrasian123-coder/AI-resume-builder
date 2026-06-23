import { create } from 'zustand';
import { ResumeData, PersonalInfo, Experience, Education, Skill } from '@/types/resume';

interface ResumeState {
  data: ResumeData;
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: Skill) => void;
  removeSkill: (id: string) => void;
}

const initialData: ResumeData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
};

export const useResumeStore = create<ResumeState>((set) => ({
  data: initialData,
  setPersonalInfo: (info) =>
    set((state) => ({
      data: {
        ...state.data,
        personalInfo: { ...state.data.personalInfo, ...info },
      },
    })),
  addExperience: (exp) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: [...state.data.experience, exp],
      },
    })),
  updateExperience: (id, exp) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.map((e) =>
          e.id === id ? { ...e, ...exp } : e
        ),
      },
    })),
  removeExperience: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.filter((e) => e.id !== id),
      },
    })),
  addEducation: (edu) =>
    set((state) => ({
      data: {
        ...state.data,
        education: [...state.data.education, edu],
      },
    })),
  updateEducation: (id, edu) =>
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.map((e) =>
          e.id === id ? { ...e, ...edu } : e
        ),
      },
    })),
  removeEducation: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.filter((e) => e.id !== id),
      },
    })),
  addSkill: (skill) =>
    set((state) => ({
      data: {
        ...state.data,
        skills: [...state.data.skills, skill],
      },
    })),
  removeSkill: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        skills: state.data.skills.filter((s) => s.id !== id),
      },
    })),
}));
