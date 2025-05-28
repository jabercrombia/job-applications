'use client';
import { usePathname } from 'next/navigation';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
  
function Header() {
    const pathname = usePathname(); // e.g., "/jobs/python"
    const parts = pathname.split('/').filter(Boolean); // ["jobs", "python"]
    const dashbaord = parts[0];

    const dashboardnav = {
        'home': '/',
        'listings' : '/dashboard/listings',
        'new posting' : '/dashboard/create-entry',
        'applications' : '/dashboard/application',
    }


    return (
        <header>
            <div className='container mx-auto'>
          {dashboardnav && (
            <NavigationMenu>
            <NavigationMenuList>
            {Object.entries(dashboardnav).map(([label, path], index) => (
                <NavigationMenuItem key={index}>
                  <a href={path}>{label}</a>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          )}
          </div>
        </header>
      );
}

export default Header;
