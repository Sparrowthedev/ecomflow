import BottomNavbar from "../MobileNavbar/Bottomnav/BottomNav";
import SideNav from "../Sidenav/SideNav";
import TopNav from "../MobileNavbar/Topnavbar/TopNav";
;

interface DashBoard {
  isBottomNavbarVisible: boolean;
  toggleNavClose: () => void;
  toggleNavOpen: () => void;
  children: React.ReactNode;
}

const Dashboard: React.FC<DashBoard> = ({
  toggleNavOpen,
  children,
  toggleNavClose,
  isBottomNavbarVisible,
}) => {


  return (
    <div>
      <TopNav toggleNavOpen={toggleNavOpen} toggleNavClose={toggleNavClose} />
      <BottomNavbar isVisible={isBottomNavbarVisible} />
      <div className="lg:hidden pb-24">{children}</div>
      <div className="hidden lg:block">
        <div className="max-w-7xl lg:flex my-0 mx-auto">
          <SideNav />
          <div className="flex-1  p-4 pr-7 overflow-y-auto md:ml-64">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
