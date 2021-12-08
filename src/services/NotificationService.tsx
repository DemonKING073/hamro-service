import { notification } from 'antd'

export default abstract class NotificationService {
    static showNotification(
        type: 'success' | 'error' | 'info' | 'warning',
        message: string
    ) {
        switch (type) {
            case 'success':
                notification.success({
                    message: message
                })
                break
            case 'error':
                notification.error({
                    message: message
                })
                break
            case 'info':
                notification.info({
                    message: message
                })
                break
            case 'warning':
                notification.warning({
                    message: message
                })
        }
    }
}