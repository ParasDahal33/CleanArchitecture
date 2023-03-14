import "./NavItem.css";
import { ReactElement } from "react";
import { useLocation } from "react-router-dom";

interface NavItemProps {
      name: string;
      icon: ReactElement;
      onClick: () => void;
      path: string;
      hasParams: boolean;
}

export default function NavItem({ name, icon, onClick, path, hasParams = false }: NavItemProps) {
      const location = useLocation();

      return (
            <div
                  id="nav-item"
                  className={`font-semibold rounded-lg px-3 py-1 cursor-pointer ${
                        isSelected(path, location.pathname, hasParams) && "nav-selected bg-side-nav-selected"
                  }`}
                  onClick={onClick}
            >
                  <div className="flex gap-2">
                        <span id="nav-icon">{icon}</span>
                        {name}
                  </div>
            </div>
      );
}

export function isSelected(path: string, locationPath: string, hasProps: boolean): boolean {
      if (!hasProps) return path === locationPath;

      //it not hasProps we need to take last pathname
      //eg: client/branch
      //output: branch
      // Location path starts with '/'
      return locationPath.split("/")[1] === path.split("/")[1];
}
