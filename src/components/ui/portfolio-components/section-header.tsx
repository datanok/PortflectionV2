export function SectionHeader({ title, subtitle, theme }: { title: string; subtitle?: string; theme?: any }) {
    return (
      <div className="mb-8">
        <h2
          className="text-3xl font-bold"
          style={{
            color: theme?.primary || '#3490dc',
            fontFamily: theme?.fontHeading || 'Montserrat',
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              color: theme?.accent || theme?.secondary || '#4fd1c5',
              fontFamily: theme?.fontBody || 'Open Sans',
            }}
            className="mt-2"
          >
            {subtitle}
          </p>
        )}
      </div>
    );
}