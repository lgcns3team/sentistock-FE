import StockDetailClient from "./stock-detail-client"

export const dynamicParams = false

export async function generateStaticParams() {
  const companies: Record<string, string> = await import(
    "../../../public/companies.json"
  ).then((m) => m.default)

  return Object.keys(companies).map((stockId) => ({
    stockId,
  }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ stockId: string }>
}) {
  const { stockId } = await params
  return <StockDetailClient stockId={stockId} />
}
