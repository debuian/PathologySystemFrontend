import { Settings } from "lucide-react";
import { Avatar, AvatarImage } from "./avatar";

export default function UserAvatar() {
  return (
    <div className="w-full flex items-center gap-3 justify-between">
      <Avatar>
        <AvatarImage
          src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
          alt="User Avatar"
        />
      </Avatar>
      <div>
        <p>Dr. Samrajya Pratap Rana</p>
        <p></p>
        <p className="text-xs text-neutral-500">Admin</p>
      </div>
      <div>
        <Settings size={16} strokeWidth={1.5} />
      </div>
    </div>
  );
}
