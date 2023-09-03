import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// Icons
import MenuIcon from "@mui/icons-material/Menu";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav className="flex h-16 justify-between items-center">
        <div className="px-1 pt-1 text-2xl">Logo</div>
        <div className="flex">
          <ul className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
            <li
              className={classNames(
                location.pathname === "/"
                  ? "border-indigo-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
              )}
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className={classNames(
                location.pathname === "/about"
                  ? "border-indigo-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
              )}
            >
              <Link to="/about">About Us</Link>
            </li>
            <li
              className={classNames(
                location.pathname === "/questions"
                  ? "border-indigo-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
              )}
            >
              <Link to="/questions">Questions</Link>
            </li>
            <li
              className={classNames(
                location.pathname === "/contact"
                  ? "border-indigo-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
              )}
            >
              <Link to="/contact">Contact us</Link>
            </li>
          </ul>
        </div>
        <div className="sm:hidden">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={isOpen} onClose={toggleMenu}>
            <List className="w-[200px]">
              <ListItem button>
                <Link
                  to="/"
                  className={classNames(
                    location.pathname === "/"
                      ? "border-indigo-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium w-full"
                  )}
                >
                  Home
                </Link>
              </ListItem>
              <ListItem button>
                <Link
                  to="/about"
                  className={classNames(
                    location.pathname === "/about"
                      ? "border-indigo-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium w-full"
                  )}
                >
                  About Us
                </Link>
              </ListItem>
              <ListItem button>
                <Link
                  to="/questions"
                  className={classNames(
                    location.pathname === "/questions"
                      ? "border-indigo-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium w-full"
                  )}
                >
                  Questions
                </Link>
              </ListItem>
              <ListItem button>
                <Link
                  to="/contact"
                  className={classNames(
                    location.pathname === "/contact"
                      ? "border-indigo-500 text-gray-900 "
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium w-full"
                  )}
                >
                  Contact us
                </Link>
              </ListItem>
            </List>
          </Drawer>
        </div>
      </nav>
    </header>
  );
}

export default Header;
