/* eslint-disable react/display-name */
import React, { createRef, forwardRef, useImperativeHandle, useState } from 'react';
import { FaInfoCircle, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import styles from './styles.module.css';

interface ToastParams {
    message: string;
    status?: 'info' | 'success' | 'error';
    duration?: number;
}

export type ToastRef = {
    show?: (params: ToastParams) => void;
}

let timerId: NodeJS.Timeout | null = null;
const Toast = forwardRef<any, ToastRef>((_: any, ref) => {
    const [_visible, _setVisible] = useState(false);
    const [_message, _setMessage] = useState('');
    const [_status, _setStatus] = useState('info');

    useImperativeHandle(ref, () => ({
        show: ({ message, status = 'info', duration = 3000 }: ToastParams) => {
            if (timerId) clearTimeout(timerId);
            _setVisible(true);
            _setMessage(message);
            _setStatus(status);
            timerId = setTimeout(() => {
                _setVisible(false);
                _setMessage('');
                _setStatus('info')
            }, duration);
        }
    }));

    const getIcon = () => {
        switch (_status) {
            case 'success':
                return <FaCheckCircle className={styles.icon} />;
            case 'error':
                return <FaExclamationCircle className={styles.icon} />;
            case 'info':
            default:
                return <FaInfoCircle className={styles.icon} />;
        }
    };


    return (
        <>
            {_visible && (
                <div className={`${styles.toast} ${styles[_status]}`}>
                    {getIcon()}
                    <span>{_message}</span>
                </div>
            )}
        </>
    );
});
const toastRef = createRef<ToastRef>();
export const ToastContainer: React.FC = () => <Toast ref={toastRef} />;
export const showToast = (params: ToastParams) => {
    toastRef.current?.show?.(params);
}