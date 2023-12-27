interface CheckEmailNotificationProps {
  onClose: () => void
}

export const CheckEmailNotification = ({ onClose }: CheckEmailNotificationProps) => {
  return (
    <div className="mb-5 flex items-center justify-between gap-2 bg-[rgb(195,250,190)] p-4">
      <p className="font-medium text-[rgb(42,104,23)]">Check your email to confirm the order</p>
      <div className="h-fit w-6 cursor-pointer text-[rgb(42,104,23)]" onClick={onClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6l-12 12"></path>
          <path d="M6 6l12 12"></path>
        </svg>
      </div>
    </div>
  )
}
