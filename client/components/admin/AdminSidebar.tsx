import { LayoutDashboard, Users, Wrench, FolderTree, Package, ShoppingCart, Building2, Palette, FileText, LogOut, Zap, Mail, BarChart3, Home, Info } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { adminAuth } from "@/hooks/useAdminAuth";

const items = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard, end: true },
  { title: "Reports", url: "/admin/report", icon: BarChart3 },
  { title: "Orders", url: "/admin/orders", icon: ShoppingCart },
  { title: "Products", url: "/admin/products", icon: Package },
  { title: "Categories", url: "/admin/categories", icon: FolderTree },
  { title: "Services", url: "/admin/services", icon: Wrench },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Company", url: "/admin/company", icon: Building2 },
  { title: "Customization", url: "/admin/customization", icon: Palette },
  { title: "PDF Template", url: "/admin/pdf-template", icon: FileText },
  { title: "Email Settings", url: "/admin/email-settings", icon: Mail },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();

  const handleLogout = () => {
    adminAuth.signOut();
    navigate("/admin/login");
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-white/5 [&>div]:bg-[#020617]"
    >
      <SidebarContent className="bg-[#020617] text-slate-300">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30 shrink-0">
            <Zap className="h-5 w-5 text-white" fill="white" />
          </div>
          {!collapsed && (
            <span className="text-xl font-bold tracking-tight text-white">
              NEXUS<span className="text-violet-500">.</span>
            </span>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            {!collapsed && (
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 px-5">
                Management
              </div>
            )}
            <SidebarMenu className="gap-1.5 px-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-transparent">
                    <NavLink
                      to={item.url}
                      end={item.end}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                          isActive
                            ? "bg-violet-600/10 text-violet-400 border border-violet-500/20 font-medium"
                            : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border border-transparent"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            {!collapsed && (
              <div className="mx-4 mb-3 p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2">
                  Stock Health
                </p>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 w-3/4 shadow-[0_0_10px_rgba(139,92,246,0.4)]" />
                </div>
                <p className="text-[10px] text-slate-400 mt-2">75% Inventory optimized</p>
              </div>
            )}
            <SidebarMenu className="px-3 pb-3">
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 rounded-xl px-3 py-2.5"
                >
                  <LogOut className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>Logout</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
