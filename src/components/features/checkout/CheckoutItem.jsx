import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Typography } from "@/components/ui/typography";

export const CheckoutItem = ({ item }) => {
  return (
    <div className="flex flex-col gap-3 p-4 border-b">
      <div className="flex gap-4">
        <div className="w-24 h-24 flex-shrink-0">
          <AspectRatio ratio={1 / 1} className="bg-slate-100 rounded-md">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="object-cover h-full w-full rounded-md"
            />
          </AspectRatio>
        </div>
        <div className="flex-grow">
          <Typography as="h4" className="font-semibold">
            {item.name}
          </Typography>
          <Typography as="p" className="text-slate-600">
            ${item.price.toFixed(2)}
          </Typography>
        </div>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-sm">View Details</AccordionTrigger>
          <AccordionContent className="text-slate-500">
            {item.description}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
