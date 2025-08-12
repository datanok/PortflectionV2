import ComponentSubmission from "@/components/ComponentSubmission";

export default function ComponentSubmissionPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Submit a Component
        </h1>
        <ComponentSubmission />
      </div>
    </div>
  );
}
