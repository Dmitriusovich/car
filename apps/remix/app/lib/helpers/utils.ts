import dayjs from "dayjs"

export const isBrowser = typeof window !== "undefined"

export const isMobile =
  isBrowser && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)

export const getFormattedDate = (date?: string | number | Date | dayjs.Dayjs | null | undefined) =>
  dayjs(date).locale("ru").format("LLL")
