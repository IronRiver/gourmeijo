declare module "*.svg" {
  import { ReactElement, SVGProps } from "react";

  const ReactComponent: (props: SVGProps<SVGElement>) => ReactElement;

  export default ReactComponent;
}

declare module "*.svg?url" {
  import { StaticImageData } from "next/dist/shared/lib/image-external";

  export const content: StaticImageData;

  export default content;
}
