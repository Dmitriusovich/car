import React, { FC, ReactNode, useEffect, useState } from "react"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { Invoice } from "~/lib/helpers/types"
import { InvoicePage } from "./InvoicePage"
import { RentalType } from "~/routes/admin+";

interface Props {
	className?: string;
	children?: ReactNode;
  data: RentalType
}

export const DownloadPDF: FC<Props> = ({ className, children, data }) => {
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    setShow(false)

    const timeout = setTimeout(() => {
      setShow(true)
    }, 500)

    return () => clearTimeout(timeout)
  }, [data])

  return (
    <div className={"download-pdf " + (!show ? "loading" : "")} title="Save PDF">
      {show && (
        <PDFDownloadLink
				  className={className}
          document={<InvoicePage pdfMode={true} data={data} />}
          fileName={`${data.customer ? `${data.customer.firstName}_${data.customer.lastName}`.toLowerCase() : "invoice"}.pdf`}
          aria-label="Save PDF"
        >{children}</PDFDownloadLink>
      )}
    </div>
  )
}
