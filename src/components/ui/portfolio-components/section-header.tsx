export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
    return (
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
      </div>
    );
  }