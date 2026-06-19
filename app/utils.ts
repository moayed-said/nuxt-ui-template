import { type FetchHooks } from 'ofetch'
import { useToast } from '#imports'

type ToastInstance = ReturnType<typeof useToast>
type tfunc = ReturnType<typeof useI18n>['t']


// eslint-disable-next-line
export function debounce<F extends (...args: any[]) => any>(
    func: F,
    waitFor: number
): (...args: Parameters<F>) => void {
    let timeout: ReturnType<typeof setTimeout> | undefined

    return (...args: Parameters<F>): void => {
        if (timeout) {
            clearTimeout(timeout)
        }

        timeout = setTimeout(() => func(...args), waitFor)
    }
}

export function localizeDate(date: Date | string, locale: string = 'ar-LY'): string {
    return new Date(date).toLocaleDateString(locale)
}

function ErrorRequestHandler(toastInstance: ToastInstance, t: tfunc): FetchHooks['onRequestError'] {
    return function ({ error }) {
        toastInstance.add({ title: t('messages.error'), description: error.message, color: 'error', icon: 'i-lucide-alert-circle' })
    }
}

function ErrorResponseHandler(toastInstance: ToastInstance, t: tfunc): FetchHooks['onResponseError'] {
    return function ({ response }) {
        toastInstance.add({ title: t('messages.error'), description: response._data.message ?? response._data.error, color: 'error', icon: 'i-lucide-alert-circle' })
    }
}

export const fetchErrorHandler = (toastInstance: ToastInstance, t: tfunc) => {
    return {
        onRequestError: ErrorRequestHandler(toastInstance, t),
        onResponseError: ErrorResponseHandler(toastInstance, t)
    }
}