'use client';
import { usePathname } from 'next/navigation';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
  } from "@/components/ui/navigation-menu"
  
function Header() {
    const pathname = usePathname();
    const parts = pathname.split('/').filter(Boolean);
    const dashboard = parts[0];

    const dashboardnav = {
        'home': '/',
        'listings' : '/dashboard/listings',
        'new posting' : '/dashboard/create-entry',
        'applications' : '/dashboard/applications',
    }

    const nav = {
        'home': '/',
        'login' : '/dashboard/listings',
    }

    return (
        <header>
            <div className='container mx-auto'>
                {dashboard ? (
                    <NavigationMenu>
                        <NavigationMenuList>
                        {Object.entries(dashboardnav).map(([label, path], index) => (
                            <NavigationMenuItem key={index}>
                            <a href={path}>{label}</a>
                            </NavigationMenuItem>
                        ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                ):(
                    <NavigationMenu>
                        <NavigationMenuList>
                        {Object.entries(nav).map(([label, path], index) => (
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
