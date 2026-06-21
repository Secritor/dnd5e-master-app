interface ArchivePlaceholderPageProps {
  title: string;
}

export function ArchivePlaceholderPage({ title }: ArchivePlaceholderPageProps) {
  return (
    <main className="grid min-h-screen place-items-center">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-muted-foreground">In development</p>
    </main>
  );
}
