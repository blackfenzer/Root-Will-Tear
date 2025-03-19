import ProductsContent from './HomeContent';

export default async function ProductsPage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  // Fetch data in the server component
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;

  // Pass data to the client component
  return <ProductsContent search={search} offset={offset} />;
}
