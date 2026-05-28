import Image from "next/image";

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function Header({ searchQuery = "", onSearchChange }: HeaderProps) {
  return (
    <header className="flex justify-between items-center px-md w-full sticky top-0 z-40 h-16 shadow-sm bg-surface shadow-[0_10px_30px_rgba(15,110,86,0.05)] border-b border-outline-variant/30">
      <div className="flex items-center pl-12 md:pl-0">
        <span className="font-display-lg text-display-lg  text-primary md:hidden">Admin Panel</span>
        
      </div>
    </header>
  );
}
