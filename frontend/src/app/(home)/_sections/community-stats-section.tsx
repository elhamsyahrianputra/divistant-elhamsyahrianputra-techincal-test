"use client";

interface CommunityStatsSectionProps {
  totalBooks: number;
  totalAuthors: number;
  totalGenres: number;
}

export function CommunityStatsSection({
  totalBooks,
  totalAuthors,
  totalGenres,
}: CommunityStatsSectionProps) {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-8 text-center md:grid-cols-3">
          <div>
            <div className="mb-2 font-bold text-4xl text-primary-light">
              {totalBooks || "0"}+
            </div>
            <div className="text-gray-600">Books Available</div>
          </div>
          <div>
            <div className="mb-2 font-bold text-4xl text-primary-light">
              {totalAuthors || "0"}+
            </div>
            <div className="text-gray-600">Popular Authors</div>
          </div>
          <div>
            <div className="mb-2 font-bold text-4xl text-primary-light">
              {totalGenres || "0"}+
            </div>
            <div className="text-gray-600">Genres</div>
          </div>
        </div>
      </div>
    </section>
  );
}
