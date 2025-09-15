import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AspectRatio } from "../ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Typography } from "../ui/typography";

import Logo from "@/assets/logo.svg";

import imageArrivals from "@/assets/images/home-page/NewArrive.webp";

export const PostFrame = ({
  children,
  paginationControls,
  headerTitle,
  headerDescription,
}) => {
  return (
    <Card className="w-full bg-white border-border border-2 rounded-lg shadow-shadow  hover:scale-105 hover:shadow-[8px_8px_0px_#000] transition duration-300">
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
            <Avatar>
              <AvatarImage src alt="Avatar logo" />
              <AvatarFallback>RF</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>
                <Typography as="h4">{headerTitle}</Typography>
              </CardTitle>
              <CardDescription>
                <Typography as="small">{headerDescription}</Typography>
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-shrink-0 w-20 h-20">
            <AspectRatio ratio={1 / 1}>
              <img
                src={imageArrivals}
                alt="Icon fire"
                className="object-cover h-full w-full rounded-2xl"
              />
            </AspectRatio>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <div className="flex w-fit p-3 lg:p-10 rounded-base bg-neutral-100 items-center justify-center">
          {children}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        {paginationControls}
      </CardFooter>
    </Card>
  );
};
