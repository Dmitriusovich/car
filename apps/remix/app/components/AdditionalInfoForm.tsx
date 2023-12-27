export const AdditionalInfoForm = () => {
  return (
    <form className="flex flex-col gap-8 text-lg">
      <div className="flex flex-col gap-2">
        <label className="font-medium">
          Полное имя<span className="text-primary-600">*</span>
        </label>
        <input
          type="text"
          className="w-full text-black bg-gray3 px-5 py-2"
          placeholder="e.g: John Doe"
          minLength={3}
          maxLength={30}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium">
          Почта<span className="text-primary-600">*</span>
        </label>
        <input
          type="text"
          className="w-full text-black bg-gray3 px-5 py-2"
          placeholder="your@email.com"
          minLength={3}
          maxLength={40}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium">
          Расскажите нам об этом<span className="text-primary-600">*</span>
        </label>
        <textarea
          className="h-36 w-full resize-none text-black bg-gray3 px-5 py-2"
          placeholder="write here.."
          minLength={3}
          maxLength={250}
        ></textarea>
      </div>
      <p>
        <span className="text-primary-600 font-medium text-lg">*</span> - обязательное поле
      </p>
      <button className="flex justify-center gap-2 rounded bg-primary-600 hover:bg-primary-700 active:bg-primary-800 px-7 py-4 font-medium text-white transition-all hover:opacity-80">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9 6l9 -6l-9 -6l-9 6"></path>
          <path d="M21 9v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10"></path>
          <path d="M3 19l6 -6"></path>
          <path d="M15 13l6 6"></path>
        </svg>
        Отправить сообщение
      </button>
    </form>
  )
}
