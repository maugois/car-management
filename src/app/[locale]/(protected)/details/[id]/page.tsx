interface DetailsProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function DetailsPage({ params }: DetailsProps) {
    const { id, locale } = await params;

    return (
        <main className="min-h-screen min-w-full flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Details</h1>
            <p>O ID capturado é: <strong>{id}</strong></p>
            {locale}
        </main>
    )
}