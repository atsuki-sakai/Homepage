import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertContactTopics(key: string) {
  switch (key) {
    case 'contact':
      return '一般的なお問い合わせ'
    case 'partner':
      return 'パートナー募集'
    case 'estimate':
      return '見積もり依頼'
    case 'monitor':
      return 'モニタリング'
    case 'other':
      return 'その他'
  }
}