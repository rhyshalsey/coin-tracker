import { useState } from "react";
import NextImage, { ImageProps } from "next/image";

import Skeleton, { SkeletonLoaderVariants } from "../Skeleton/Skeleton";

type propTypes = ImageProps & {
  loaderShape: SkeletonLoaderVariants.circle | SkeletonLoaderVariants.rectangle;
};

const Image = ({
  loaderShape = SkeletonLoaderVariants.circle,
  width,
  height,
  ...props
}: propTypes) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <Skeleton
          width={width}
          height={height}
          variant={loaderShape}
          style={{ position: "absolute" }}
        />
      )}
      <NextImage
        width={width}
        height={height}
        {...props}
        onLoadingComplete={(callbackArgs) => {
          setIsLoaded(true);
          if (typeof props.onLoadingComplete === "function") {
            props.onLoadingComplete(callbackArgs);
          }
        }}
      />
    </>
  );
};

export default Image;
