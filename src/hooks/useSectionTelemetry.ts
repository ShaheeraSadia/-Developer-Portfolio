import { useState, useEffect, useCallback } from 'react';

export interface SectionVisitStats {
  [sectionId: string]: number;
}

export interface SectionTelemetrySummary {
  stats: SectionVisitStats;
  totalVisits: number;
  topSection: { id: string; count: number; percentage: number } | null;
  sortedSections: Array<{ id: string; label: string; count: number; percentage: number }>;
  lastVisited: string | null;
  lastVisitedTimestamp: string | null;
  resetStats: () => void;
}

const SECTION_LABELS: Record<string, string> = {
  home: 'Home Overview',
  about: 'About Me',
  services: 'Core Services',
  projects: 'Featured Projects',
  skills: 'Skills Matrix',
  experience: 'Career Timeline',
  component_lab: 'Component Lab',
  architecture: 'Architecture Principles',
  contact: 'Contact Transmission',
  all: 'Full Stack Continuous',
};

const STORAGE_KEY = 'shaheera_section_telemetry_v1';

export function useSectionTelemetry(currentSection: string): SectionTelemetrySummary {
  const [stats, setStats] = useState<SectionVisitStats>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback if localStorage is disabled or restricted in iframe
    }
    return {
      home: 1,
      about: 0,
      services: 0,
      projects: 0,
      skills: 0,
      experience: 0,
      component_lab: 0,
      architecture: 0,
      contact: 0,
      all: 0,
    };
  });

  const [lastVisited, setLastVisited] = useState<string | null>(currentSection);
  const [lastVisitedTimestamp, setLastVisitedTimestamp] = useState<string | null>(() => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  });

  // Track section transitions
  useEffect(() => {
    if (!currentSection) return;

    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    setStats((prev) => {
      const updated = {
        ...prev,
        [currentSection]: (prev[currentSection] || 0) + 1,
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // localStorage write error ignored
      }

      return updated;
    });

    setLastVisited(currentSection);
    setLastVisitedTimestamp(timeStr);
  }, [currentSection]);

  const resetStats = useCallback(() => {
    const initial: SectionVisitStats = {
      home: 1,
      about: 0,
      services: 0,
      projects: 0,
      skills: 0,
      experience: 0,
      component_lab: 0,
      architecture: 0,
      contact: 0,
      all: 0,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    } catch {
      // ignored
    }
    setStats(initial);
  }, []);

  const totalVisits: number = (Object.values(stats) as number[]).reduce((acc: number, val: number) => acc + (typeof val === 'number' ? val : 0), 0);

  const sortedSections: Array<{ id: string; label: string; count: number; percentage: number }> = Object.entries(stats)
    .filter(([_, count]) => (typeof count === 'number' ? count : 0) > 0)
    .map(([id, count]) => {
      const numCount = typeof count === 'number' ? count : 0;
      return {
        id,
        label: SECTION_LABELS[id] || id,
        count: numCount,
        percentage: totalVisits > 0 ? Math.round((numCount / totalVisits) * 100) : 0,
      };
    })
    .sort((a, b) => b.count - a.count);

  const topSection = sortedSections.length > 0 ? sortedSections[0] : null;

  return {
    stats,
    totalVisits,
    topSection,
    sortedSections,
    lastVisited,
    lastVisitedTimestamp,
    resetStats,
  };
}
