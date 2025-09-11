import { Typography } from "../ui/typography";
import { Button } from "../ui/button";

import { ArrowLeft } from "lucide-react";

export const TitleBar = ({ title, onBack }) => {
  return (
    <div className="flex gap-3 w-full">
      <Button
        variant="neutral"
        size="icon"
        className="cursor-pointer"
        onClick={onBack}
      >
        <ArrowLeft className="w-4 h-4" />
      </Button>
      <Typography as="h2">{title}</Typography>
    </div>
  );
};
