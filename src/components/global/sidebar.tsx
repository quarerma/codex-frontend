import { Sidebar, SidebarContent, SidebarProvider, useSidebar } from '@/components/ui/sidebar';
import { useEffect, useState } from 'react';

export function AppSidebar() {
  const { state } = useSidebar();

  const [showOnlyIcons, setShowOnlyIcons] = useState(false);

  useEffect(() => {
    setShowOnlyIcons(state === 'collapsed');
  }, [state]);

  return <Sidebar></Sidebar>;
}
