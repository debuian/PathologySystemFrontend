import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="z-10">
      <div className="px4 sm:px-6 lg:px-8 py-[9px] flex items-center justify-between">
        <div className="flex-1 flex items-center gap-2 justify-center lg:justify-end ">
          <form>
            <div
              className="relative border 
            rounded-md"
            >
              <div className="absolute inset-y-0 left-2 flex items-center">
                <Search size={16} strokeWidth={1.5} />
              </div>
              <input
                className="pl-10 pr-3 py-2 w-full"
                placeholder="Search reports, patients..."
                type="search"
              />
            </div>
          </form>
          <Bell size={16} strokeWidth={1.5} />
        </div>
      </div>
    </header>
  );
}
