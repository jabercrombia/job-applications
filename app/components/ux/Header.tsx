'use client';
import { usePathname } from 'next/navigation';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
  } from "@/components/ui/navigation-menu"
  
function Header() {
    const pathname = usePathname(); // e.g., "/jobs/python"
    const parts = pathname.split('/').filter(Boolean); // ["jobs", "python"]
    const dashboard = parts[0];

    const dashboardnav = {
        'home': '/',
        'listings' : '/dashboard/listings',
        'new posting' : '/dashboard/create-entry',
        'applications' : '/dashboard/applications',
    }

    return (
        <header>
            <div className='container mx-auto'>
                {dashboard && (
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
