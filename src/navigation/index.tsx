import React from "react";
import { Switch } from "react-router-dom";
import { HomeNavigation } from "src/features/home/navigation";

const Navigation: React.FC = (): JSX.Element => {
  const homeRoutes = renderRoutes(HomeNavigation);

  return <Switch>{homeRoutes}</Switch>;
};

export { Navigation };
