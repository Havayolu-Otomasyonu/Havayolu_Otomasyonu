import { useRoutes } from 'react-router-dom';
import App from '../App';
import Home from '../Pages/Home';
import { UserFlightsRoute } from '../Components/User_Flights/route';
import { User_FlightSearchRoute } from '../Components/User_FlightSearch/route';
import { UserAirportsRoute } from '../Components/User_Airports/route';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> }, 
      ...UserFlightsRoute,...UserAirportsRoute,...User_FlightSearchRoute       
    ]
  }
];

export const ProjectRoute = () => {
  return useRoutes(routes);
};
