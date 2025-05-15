"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Gift,
  Settings,
  CreditCard,
  BarChart2,
  HelpCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserButton, useUser } from "@clerk/nextjs";


export function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Clientes",
      href: "/customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Identidade da IA",
      href: "/persona-ia",
      icon: <Gift className="h-5 w-5" />,
    },
    {
      name: "Mensagens Automáticas",
      href: "/experiencia",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      name: "Conexão",
      href: "/whatsapp",
      icon: <BarChart2 className="h-5 w-5" />,
    },
  ];

  const secondaryItems = [
    {
      name: "Configurações",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      name: "Ajuda",
      href: "/help",
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ];

  return (
    <div className="hidden border-r bg-muted/40 md:block h-screen sticky top-0">
      <div className="flex h-full max-h-screen flex-col gap-2">
        {/* Logo/Cabeçalho */}
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Gift className="h-6 w-6 text-primary" />
            <span className="text-lg">Fideliza</span>
          </Link>
        </div>

        {/* Navegação principal */}
        <div className="flex-1 px-3 py-4">
          <nav className="grid items-start gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "bg-muted text-primary"
                    : ""
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Navegação secundária */}
        <div className="px-3 pb-4">
          <nav className="grid items-start gap-1">
            {secondaryItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname === item.href ? "bg-muted text-primary" : ""
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Perfil do usuário */}
        <div className="mt-auto p-4 border-t">
          <div className="flex items-center gap-4">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user?.imageUrl} alt="Avatar" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.fullName}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
            <UserButton/>
          </div>
        </div>
      </div>
    </div>
  );
}
