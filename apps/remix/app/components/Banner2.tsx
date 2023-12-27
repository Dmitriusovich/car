export const Banner2 = () => {
  return (
    <div className="bg-fill bg-gray bg-banner bg-bottom bg-no-repeat bg-contain	 bg-blend-screen">
      <div className="container py-28 text-center text-white mx-auto">
        <div className="flex flex-col justify-center gap-5 lg:flex-row">
          <div className="text-4xl font-bold">
            <h2>Забронируйте автомобиль, связавшись с нами</h2>
          </div>

          <div className="flex items-center justify-center gap-3 whitespace-nowrap text-3xl font-medium text-primary-600">
            <div className="w-10">
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
              </svg>
            </div>
            <div>+375 (29)-200-7890</div>
          </div>
        </div>
      </div>
    </div>
  )
}
