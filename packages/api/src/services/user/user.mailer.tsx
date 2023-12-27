import type { RentalManager } from "@boilerplate/database/types"
import { ResetPasswordEmail } from "@boilerplate/emails"

import { FULL_WEB_URL, SMTP_USERNAME } from "../../lib/config"
import { mailer } from "../../lib/mailer"

export async function sendResetPasswordEmail(manager: RentalManager, token: string) {
  try {
    if (!manager.email) return

    await mailer.sendReact({
      react: <ResetPasswordEmail link={`${FULL_WEB_URL}/reset-password/${token}`} />,
      to: manager.email,
      from: `Car rentals <${SMTP_USERNAME}>`,
      subject: "Reset Password",
    })
  } catch (error) {
    console.log(error)
  }
}
