import { useRoutes } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import { UserFlightsRoute } from "../Components/User_Flights/route";
import { User_FlightSearchRoute } from "../Components/User_FlightSearch/route";
import { UserAirportsRoute } from "../Components/User_Airports/route";
import { AirportDetailsRoute } from "../Components/AirportDetails/route";
import AdminMain from "../Components/AdminMainPage/AdminMain/AdminMain";
import DashBoard from "../Components/AdminMainPage/DashBoard/DashBoard";
import { AdminAircraftsRoute } from "../Components/AdminMainPage/Admin_Aircrafts/route";
import { AdminAirLinesRoute } from "../Components/AdminMainPage/Admin_AirLines/route";
import { AdminAirPortsRoute } from "../Components/AdminMainPage/Admin_Airports/route";
import { AdminFlightsRoute } from "../Components/AdminMainPage/Admin_Flights/route";
import { AdminRunwaysRoute } from "../Components/AdminMainPage/Admin_Runways/route";
import { AdminStaffRoute } from "../Components/AdminMainPage/Admin_Staff/route";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      ...UserFlightsRoute,
      ...UserAirportsRoute,
      ...User_FlightSearchRoute,
      ...AirportDetailsRoute,
      ...UserAirportsRoute,
    ],
  },
  {
    path: "/admin-panel",
    element: <AdminMain />,
    children: [
      { index: true, element: <DashBoard /> }, 
      ...AdminAircraftsRoute,
      ...AdminAirLinesRoute,
      ...AdminAirPortsRoute,
      ...AdminFlightsRoute,
      ...AdminRunwaysRoute,
      ...AdminStaffRoute
    ],
  },
];

export const ProjectRoute = () => {
  return useRoutes(routes);
};
