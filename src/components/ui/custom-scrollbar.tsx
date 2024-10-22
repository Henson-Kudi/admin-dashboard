'use client'

import React from 'react'

interface CustomScrollbarProps {
  children: React.ReactNode
  className?: string
}

export function CustomScrollbar({ children, className = '' }: CustomScrollbarProps) {
  return (
    <div className={`custom-scrollbar ${className}`}>
      {children}
      <style jsx global>{`
        .custom-scrollbar {
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: var(--scrollbar-track);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: var(--scrollbar-thumb);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: var(--scrollbar-thumb-hover);
        }

        /* Hide scrollbar arrows */
        .custom-scrollbar::-webkit-scrollbar-button {
          display: none;
        }

        :root {
          --scrollbar-track: hsl(var(--background));
          --scrollbar-thumb: hsl(var(--muted-foreground) / 0.3);
          --scrollbar-thumb-hover: hsl(var(--muted-foreground) / 0.5);
        }

        .dark {
          --scrollbar-track: hsl(var(--background));
          --scrollbar-thumb: hsl(var(--muted-foreground) / 0.4);
          --scrollbar-thumb-hover: hsl(var(--muted-foreground) / 0.6);
        }
      `}</style>
    </div>
  )
}