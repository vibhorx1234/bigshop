import Home from './pages/Home';
import About from './pages/About';
import AllProducts from './pages/AllProducts';
import TV from './pages/TV';
import WashingMachine from './pages/WashingMachine';
import Refrigerator from './pages/Refrigerator';
import Dishwashers from './pages/Dishwashers';
import MicrowaveOvens from './pages/MicrowaveOvens';
import BulkEnquiry from './pages/BulkEnquiry';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import AC from './pages/AC';
import LGAudio from './pages/LGAudio';
import DeepFreezer from './pages/DeepFreezer';
import VisiCooler from './pages/VisiCooler';
import Homeware from './pages/Homeware';

const routes = [
  { path: '/', element: Home, name: 'Home' },
  { path: '/about', element: About, name: 'About' },
  { path: '/products', element: AllProducts, name: 'All Products' },
  { path: '/products/tv', element: TV, name: 'TV' },
  { path: '/products/washing-machine', element: WashingMachine, name: 'Washing Machine' },
  { path: '/products/ac', element: AC, name: 'AC' },
  { path: '/products/audio', element: LGAudio, name: 'LG Audio' },
  { path: '/products/freezer', element: DeepFreezer, name: 'Deep Freezer' },
  { path: '/products/visi', element: VisiCooler, name: 'Visi Cooler' },
  { path: '/products/refrigerator', element: Refrigerator, name: 'Refrigerator' },
  { path: '/products/dishwashers', element: Dishwashers, name: 'Dishwashers' },
  { path: '/products/microwave-ovens', element: MicrowaveOvens, name: 'Microwave Ovens' },
  { path: '/products/homeware', element: Homeware, name: 'Homeware' },
  { path: '/bulk-enquiry', element: BulkEnquiry, name: 'Bulk Enquiry' },
  { path: '/contact', element: Contact, name: 'Contact' },
  { path: '*', element: NotFound, name: 'Not Found' }
];

export default routes;