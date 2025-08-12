import ComponentMarketplace from "@/components/ComponentMarketplace";

export default function ComponentMarketplacePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Component Marketplace
        </h1>
        <ComponentMarketplace />
      </div>
    </div>
  );
}
