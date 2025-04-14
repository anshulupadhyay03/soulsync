import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Crown, HelpCircle, Search as SearchIcon } from 'lucide-react'; // For icons

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 bg-cyan-900 text-white p-4 flex justify-between items-center z-50 shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="/src/assets/soul-sync.svg"
          alt="Soul Sync Logo"
          className="w-10 h-10 mr-2"
        />
        <h1 className="text-2xl font-bold">Soul Sync</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex space-x-6 items-center">
        <a href="#" className="hover:underline">My Shaadi</a>
        <a href="#" className="hover:underline">
          Matches <span className="bg-red-600 text-white rounded-full px-2 py-1 text-xs">999+</span>
        </a>
        <a href="#" className="hover:underline">Search</a>
        <a href="#" className="hover:underline">
          Inbox <span className="bg-red-600 text-white rounded-full px-2 py-1 text-xs">4</span>
        </a>
      </nav>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" className="bg-yellow-400 text-black hover:bg-yellow-500">
          <Crown className="mr-2 h-4 w-4" /> Upgrade Now
        </Button>

        {/* Help Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-white hover:bg-red-600">
              <HelpCircle className="mr-2 h-4 w-4" /> Help
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>FAQ</DropdownMenuItem>
            <DropdownMenuItem>Contact Support</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center space-x-2 cursor-pointer">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>My Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;