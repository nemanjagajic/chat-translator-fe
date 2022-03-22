import { useRouter } from 'next/router'
import en from '../locales/en'

export const useLocale = () => {
  const { locale } = useRouter()
  // Other languages will come here in future
  const t = locale === 'en' ? en : en
  return { t }
}