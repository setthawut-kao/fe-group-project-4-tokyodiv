import { cn } from "@/lib/utils";

export default function ImageCard({ imageUrl, caption, className }) {
  return (
    <figure
      className={cn(
        "w-full overflow-hidden rounded-base border-2 border-border bg-main font-base shadow-shadow",
        className
      )}
    >
      <img className="w-full aspect-4/3" src={imageUrl} alt="image" />
      <figcaption className="border-t-2 text-main-foreground border-border p-4 truncate">
        {caption}
      </figcaption>
    </figure>
  );
}
