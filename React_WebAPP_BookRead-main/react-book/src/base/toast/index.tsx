export type { ToastShowProps } from '@/base/toast/method';

import { show } from '@/base/toast/method';

export interface ToastProps {
    show: typeof show;
}

const Toast = {
    show
}

export default Toast;