import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  return (
    <div>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
        style={{
          backgroundColor: "rgba(5,13,5,0.7)",
          borderColor: "rgba(74,222,128,0.15)",
        }}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <motion.a
            href="#hero"
            className="text-lg font-bold tracking-tight"
            style={{ color: "#4ade80" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Arko.
          </motion.a>

          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm font-medium overflow-x-auto pb-2 sm:pb-0">
            {["about", "skill", "client-project", "project", "contact"].map(
              (link, i) => (
                <motion.a
                  key={link}
                  href={`#${link}`}
                  className="capitalize whitespace-nowrap transition-colors"
                  style={{ color: "rgba(226,240,226,0.55)" }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                  whileHover={{ color: "#4ade80", y: -1 }}
                >
                  {link === "client-project"
                    ? "Client Project"
                    : link.charAt(0).toUpperCase() + link.slice(1)}
                </motion.a>
              ),
            )}
          </div>
        </nav>
      </motion.header>
    </div>
  );
};

export default Navbar;
