interface DetailsProps {
  params: {
    id: string;
    locale: string;
  };
}

export default async function DetailsPage({ params }: DetailsProps) {
    const { id, locale } = params;

    return (
        <main className="min-h-screen min-w-full flex items-center justify-center">
            <h1 className="text-3xl font-bold">Details</h1>
            <p>O ID capturado é: <strong>{id}</strong></p>
            <p>Idioma (Locale): {locale}</p>
        </main>
    )
}