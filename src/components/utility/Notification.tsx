import React, { FC, ReactNode } from 'react'
import './Notification.css'

export const enum NotificationType { SUCCESS, ERROR }

const notificationClassMap: Record<NotificationType, string> = {
  [NotificationType.SUCCESS]: 'success',
  [NotificationType.ERROR]: 'error',
}

interface NotificationComponentProps {
  children: ReactNode
  type: NotificationType
}

export const Notification: FC<NotificationComponentProps> = ({ children, type }) => <div
  className={`notification ${notificationClassMap[type]}`}
>
  {children}
</div>
