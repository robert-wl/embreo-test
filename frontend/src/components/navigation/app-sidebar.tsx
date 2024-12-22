import { ComponentProps } from "react";
import { HomeIcon } from "lucide-react";
import { NavUser } from "@/components/navigation/nav-user.tsx";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar.tsx";
import { DropdownMenu } from "@/components/ui/dropdown-menu.tsx";
import EventEazyIcon from "@/components/icons/event-eazy-icon.tsx";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navigation: [
    {
      name: "Dashboard",
      url: "#",
      icon: HomeIcon,
    },
  ],
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <SidebarMenuButton
                size="lg"
                className="hover:bg-transparent cursor-auto">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white text-black">
                  <EventEazyIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight text-white">
                  <span className="truncate font-semibold">EventEazy</span>
                </div>
              </SidebarMenuButton>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {data.navigation.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <a
                    className="flex gap-4"
                    href={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
