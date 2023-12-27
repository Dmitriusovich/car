export const AdditionalInfoContact = () => {
  return (
    <div className="flex flex-col items-start gap-5">
      <a href="tel:123-456-789" className="transition-all hover:text-primary-600">
        <div className="flex w-fit justify-center gap-2">
          <div className="w-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
              <path d="M15 7a2 2 0 0 1 2 2"></path>
              <path d="M15 3a6 6 0 0 1 6 6"></path>
            </svg>
          </div>

          <div>
            <p className="font-medium">+375 (29)-200-7890</p>
          </div>
        </div>
      </a>

      <a href="mailto:email@example.com" className="transition-all hover:text-primary-600">
        <div className="flex justify-center gap-2">
          <div className="w-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
              <path d="M3 7l9 6l9 -6"></path>
            </svg>
          </div>
          <div>
            <p className="font-medium ">email@example.com</p>
          </div>
        </div>
      </a>

      <div className="flex cursor-pointer justify-center gap-2 transition-all hover:text-primary-600">
        <div className="w-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
          </svg>
        </div>
        <div>
          <p className="font-medium ">Минск, Беларусь</p>
        </div>
      </div>
    </div>
  )
}
