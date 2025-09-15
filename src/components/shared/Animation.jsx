import Lottie from "lottie-react";
import { Typography } from "../ui/typography";

/**
 * Component สำหรับแสดง Lottie Animation ที่สามารถนำกลับมาใช้ซ้ำได้
 * @param {{
 * animationData: object,
 * type?: 'fullPage' | 'inline',
 * message?: string,
 * className?: string,
 * loop?: boolean
 * }} props
 */
export const Animation = ({
  animationData,
  type = "inline",
  message,
  className = "w-60 h-60",
  loop = true,
}) => {
  const content = (
    <>
      <Lottie animationData={animationData} loop={loop} className={className} />
      {message && (
        <Typography as="p" className="mt-4 text-center text-muted-foreground">
          {message}
        </Typography>
      )}
    </>
  );

  if (type === "fullPage") {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-background z-99">
        {content}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-full w-full py-10">
      {content}
    </div>
  );
};
