import { create } from 'zustand'

type OnboardingState = {
  step: number
  businessName: string
  businessType: string
  phoneNumber: string
  selectedPlan: string
  subdomain: string
  setStep: (step: number) => void
  setBusinessName: (name: string) => void
  setBusinessType: (type: string) => void
  setPhoneNumber: (phone: string) => void
  setSelectedPlan: (plan: string) => void
  setSubdomain: (subdomain: string) => void
  reset: () => void
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  step: 1,
  businessName: '',
  businessType: '',
  phoneNumber: '',
  selectedPlan: 'basic',
  subdomain: '',
  setStep: (step) => set({ step }),
  setBusinessName: (businessName) => set({ businessName }),
  setBusinessType: (businessType) => set({ businessType }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setSelectedPlan: (selectedPlan) => set({ selectedPlan }),
  setSubdomain: (subdomain) => set({ subdomain }),
  reset: () => set({ 
    step: 1,
    businessName: '',
    businessType: '',
    phoneNumber: '',
    selectedPlan: 'basic',
    subdomain: ''
  })
}))