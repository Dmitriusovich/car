import { render } from "@react-email/render"
import type { Transporter } from "nodemailer"
import { createTransport } from "nodemailer"
import type { SentMessageInfo } from "nodemailer/lib/smtp-transport"
import type { CreateEmailOptions } from "resend/build/src/emails/interfaces"

import { SMTP_HOST, SMTP_PASSWORD, SMTP_SERVICE, SMTP_USERNAME } from "./config"

type SendEmailProps = CreateEmailOptions & {
  react: React.ReactElement
}

class Mailer {
  private readonly transporter: Transporter<SentMessageInfo>
  constructor() {
    this.transporter = createTransport({
      host: SMTP_HOST,
      service: SMTP_SERVICE || "",
      auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
      },
    })
  }

  async send(args: CreateEmailOptions) {
    try {
      return this.transporter.sendMail(args)
    } catch (err) {
      console.log("Error sending mail:", err)
    }
  }

  async sendReact(args: SendEmailProps) {
    try {
      const html = render(args.react, { pretty: true })
      const text = render(args.react, { plainText: true })
      return this.transporter.sendMail({
        ...args,
        html,
        text,
      })
    } catch (err) {
      console.log("Error sending mail:", err)
    }
  }
}

export const mailer = new Mailer()
