import { useRoutes, RouteObject } from "react-router-dom";
import Models from "../pages/models";
import Readiness from "../pages/readiness";
import ModelPresentation from "../pages/modelPresentation";
import { ModelPresentationProvider } from "../context/modelPresentationContext";
import CapacityModel from "../pages/capacityModel";
import { ReadinessProvider } from "../context/readinessContext";

type RoutesType = () => React.ReactElement<
  unknown,
  string | React.JSXElementConstructor<unknown>
> | null;

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Models />,
  },
  {
    path: "/readiness/:system_name",
    element: (
      <ReadinessProvider>
        <Readiness />
      </ReadinessProvider>
    ),
  },
  {
    path: "/capacity-model/:system_name",
    element: (
      <ReadinessProvider>
        <CapacityModel />
      </ReadinessProvider>
    ),
  },
  {
    path: "/model-presentation/:system_name",
    element: (
      <ModelPresentationProvider>
        <ModelPresentation />
      </ModelPresentationProvider>
    ),
  },
];

const Routes: RoutesType = () => useRoutes(routes);

export default Routes;
