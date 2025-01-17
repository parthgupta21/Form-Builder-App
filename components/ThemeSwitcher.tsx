'use client';

import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { SunIcon, MonitorIcon, MoonIcon } from 'lucide-react';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() =>
        setMounted(true), []);
    if (!mounted) return null;

    return (
        <Tabs defaultValue={theme}>
            <TabsList className='border'>
                <TabsTrigger
                    value='light'
                    onClick={() => setTheme("Light")}
                >
                    <SunIcon className='h-[1.2rem] w-[1.2rem' />
                </TabsTrigger>

                <TabsTrigger
                    value='light'
                    onClick={() => setTheme("dark")}
                >
                    <MoonIcon className='h-[1.2rem] w-[1.2rem rotate-90 transition-all dark:rotate-0' />
                </TabsTrigger>

                <TabsTrigger
                    value='system'
                    onClick={() => setTheme("system")}
                >
                    <MonitorIcon className='h-[1.2rem] w-[1.2rem' />
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )

}

export default ThemeSwitcher

