declare module "react-d3-library" {
  import React from "react";

  interface ComponentProps {
    data: any;
  }

  export const Component: React.FC<ComponentProps>;

  const rd3: {
    Component: React.FC<ComponentProps>;
  };

  export default rd3;
}
