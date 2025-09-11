import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

import { ChevronLeft, ChevronRight } from "lucide-react";

export const PaginationControls = ({
  onPrev,
  onNext,
  currentPage,
  totalPages,
}) => {
  return (
    <div className="flex items-center gap-3">
      <Button
        className="cursor-pointer"
        onClick={onPrev}
        disabled={currentPage === 1}
        size="icon"
        variant="neutral"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-1 border-2 border-border shadow-shadow rounded-base p-1">
        <Typography as="small">{currentPage}</Typography>
        <Typography as="small">of</Typography>
        <Typography as="small">{totalPages || 1}</Typography>
      </div>

      <Button
        className="cursor-pointer"
        onClick={onNext}
        disabled={currentPage === totalPages}
        size="icon"
        variant="neutral"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
