import React, { useEffect, useState } from 'react'
import { Button } from './button'
import { LucideMoon, LucideSun } from 'lucide-react';

const DarkModeToggler = () => {

    const [darkMode, setDarkMode] =useState(
        () => localStorage.getItem("darkMode") === "dark"
    );

    useEffect(() => {
        const root = document.documentElement;

        if (darkMode) {
            root.classList.add("dark");
            localStorage.setItem("darkMode", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("darkMode", "dark");
        }
    }, [darkMode]);

  return (
    <Button
        size='lg'
        onClick={() => setDarkMode((prev) => !prev)}
        className="flex items-center px-4 py-2 mb-5 bg-slate-100 text-slate-700 dark:bg-gray-800 dark:text-white"
    >
        {darkMode ? <LucideSun /> : <LucideMoon /> }
    </Button>
  )
}

export default DarkModeToggler;