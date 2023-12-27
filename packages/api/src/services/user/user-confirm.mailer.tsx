import type { Customer } from "@boilerplate/database/types"
import { ConfirmOrderEmail } from "@boilerplate/emails"

import { FULL_WEB_URL, SMTP_USERNAME } from "../../lib/config"
import { mailer } from "../../lib/mailer"

export async function sendConfirmOrderEmail(manager: Customer, token: string) {
  try {
    if (!manager.email) return

    await mailer.sendReact({
      react: <ConfirmOrderEmail link={`${FULL_WEB_URL}?confirm-order=${token}`} />,
      to: manager.email,
      from: `Car rentals <${SMTP_USERNAME}>`,
      subject: "Confirm order",
    })
  } catch (error) {
    console.log(error)
  }
}
