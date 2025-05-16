// schemas/onboardingSchema.ts
import { z } from 'zod'

export const onboardingSchema = z.object({
  businessName: z.string().min(3, "Mínimo 3 caracteres"),
  businessType: z.string().nonempty("Selecione um tipo"),
  phoneNumber: z.string()
    .min(11, "Número incompleto")
    .regex(/^\d+$/, "Apenas números"),
  subdomain: z.string()
    .min(3)
    .max(63)
    .regex(/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, "Subdomínio inválido"),
  selectedPlan: z.enum(['basic', 'pro', 'enterprise', 'free'])
})

export type OnboardingData = z.infer<typeof onboardingSchema>