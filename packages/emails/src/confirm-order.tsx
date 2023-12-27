import { Button } from "@react-email/button"

import { EmailWrapper } from "./EmailWrapper"

export function ConfirmOrderEmail(props: { link?: string }) {
  const link = props.link || "localhost:3000"
  return (
    <EmailWrapper>
      <div>
        <h1 className="text-2xl font-bold text-black">Confirm Order</h1>
        <p className="mb-4 text-black">Click below to confirm your order</p>
        <Button href={link} className="bg-primary-500 rounded-xs mb-4 px-3 py-3 text-black">
          Confirm order
        </Button>
        <a href={link} className="block underline">
          {link}
        </a>
      </div>
    </EmailWrapper>
  )
}
