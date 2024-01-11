import React, { FC, ReactElement } from "react"
import { Document as PdfDocument } from "@react-pdf/renderer"

interface Props {
  pdfMode?: boolean
  children: ReactElement
}

export const Document: FC<Props> = ({ pdfMode, children }) => {
  return <>{pdfMode ? <PdfDocument>{children}</PdfDocument> : <>{children}</>}</>
}
