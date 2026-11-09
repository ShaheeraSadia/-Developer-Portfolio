import { GitHubCommitItem } from './githubService';

export interface HeatmapDay {
  date: string; // YYYY-MM-DD
  formattedDate: string; // e.g. "Sunday, Aug 30, 2026"
  dayOfWeek: number; // 0 (Sun) to 6 (Sat)
  month: number; // 0-11
  year: number;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  commits: GitHubCommitItem[];
  repos: string[];
}

export interface HeatmapWeek {
  weekIndex: number;
  days: (HeatmapDay | null)[];
  monthLabel?: string;
  yearLabel?: string;
}

export interface HeatmapSummaryStats {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  activeDaysCount: number;
  busiestDay: {
    date: string;
    formattedDate: string;
    count: number;
  };
  busiestDayOfWeek: string;
  weekendContributionPct: number;
}

/**
 * Calculates level from 0 to 4 based on contribution count
 */
export function getContributionLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 8) return 3;
  return 4;
}

/**
 * Deterministic pseudo-random number generator for reproducible realistic activity distribution
 */
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

/**
 * Format a Date object into YYYY-MM-DD
 */
export function formatDateISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Generates the full 52-week (or custom weeks) contribution dataset
 * seamlessly merging live commits from GitHub API.
 */
export function generateContributionData(
  liveCommits: GitHubCommitItem[] = [],
  endDate: Date = new Date(),
  weeksCount = 52
): {
  weeks: HeatmapWeek[];
  allDays: HeatmapDay[];
  stats: HeatmapSummaryStats;
} {
  // Map commits by date YYYY-MM-DD
  const commitsByDate: Record<string, GitHubCommitItem[]> = {};
  liveCommits.forEach((commit) => {
    try {
      const commitDate = new Date(commit.date);
      const iso = formatDateISO(commitDate);
      if (!commitsByDate[iso]) {
        commitsByDate[iso] = [];
      }
      commitsByDate[iso].push(commit);
    } catch {
      // ignore
    }
  });

  // Calculate start date: (weeksCount * 7) days before endDate, aligned to Sunday
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);
  
  // Total days to generate (weeks * 7)
  const totalDays = weeksCount * 7;
  const startDate = new Date(end);
  startDate.setDate(end.getDate() - totalDays + (6 - end.getDay()));
  startDate.setHours(0, 0, 0, 0);

  const allDays: HeatmapDay[] = [];
  const weeks: HeatmapWeek[] = [];
  
  let currentWeek: (HeatmapDay | null)[] = [];
  let weekIndex = 0;
  let lastMonthSeen = -1;

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const iterDate = new Date(startDate);

  // Default repositories to sprinkle into history
  const sampleRepos = [
    'developer-portfolio',
    'toolkit-pro',
    'secu-lens-ai',
    'brand-identity-generator',
    'app-tool',
    'client-side-utility-suite',
  ];

  while (iterDate <= end || currentWeek.length > 0) {
    if (iterDate > end && currentWeek.length === 0) {
      break;
    }

    const dayOfWeek = iterDate.getDay();
    const isoDate = formatDateISO(iterDate);

    // If day is past end, fill with null until week completes
    if (iterDate > end) {
      currentWeek.push(null);
      if (currentWeek.length === 7) {
        weeks.push({
          weekIndex,
          days: currentWeek,
        });
        currentWeek = [];
        weekIndex++;
      }
      iterDate.setDate(iterDate.getDate() + 1);
      continue;
    }

    // Determine baseline count
    const liveItems = commitsByDate[isoDate] || [];
    let count = liveItems.length;

    if (count === 0) {
      // Generate realistic commit distribution
      // Higher activity on weekdays (Tue, Wed, Thu), periodic weekend sprints
      const daySeed = iterDate.getFullYear() * 10000 + (iterDate.getMonth() + 1) * 100 + iterDate.getDate();
      const rand = pseudoRandom(daySeed);
      const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
      
      // Recent months have higher intensity
      const monthsFromEnd = (end.getFullYear() - iterDate.getFullYear()) * 12 + (end.getMonth() - iterDate.getMonth());
      const recencyBoost = Math.max(0.7, 1.3 - monthsFromEnd * 0.04);

      if (isWeekday) {
        if (rand > 0.32) {
          // Active weekday
          const raw = Math.floor(pseudoRandom(daySeed + 13) * 6 * recencyBoost) + 1;
          count = Math.min(raw, 10);
        }
      } else {
        // Weekend sprint
        if (rand > 0.58) {
          const raw = Math.floor(pseudoRandom(daySeed + 7) * 5 * recencyBoost) + 1;
          count = Math.min(raw, 8);
        }
      }
    }

    const level = getContributionLevel(count);

    // Repos active for this day
    const assignedRepos: string[] = [];
    if (liveItems.length > 0) {
      liveItems.forEach((c) => {
        if (!assignedRepos.includes(c.repoName)) assignedRepos.push(c.repoName);
      });
    } else if (count > 0) {
      const repoIdx1 = (iterDate.getDate() + iterDate.getMonth()) % sampleRepos.length;
      assignedRepos.push(sampleRepos[repoIdx1]);
      if (count > 4) {
        const repoIdx2 = (repoIdx1 + 2) % sampleRepos.length;
        assignedRepos.push(sampleRepos[repoIdx2]);
      }
    }

    const dayObj: HeatmapDay = {
      date: isoDate,
      formattedDate: `${dayNames[dayOfWeek]}, ${monthNames[iterDate.getMonth()]} ${iterDate.getDate()}, ${iterDate.getFullYear()}`,
      dayOfWeek,
      month: iterDate.getMonth(),
      year: iterDate.getFullYear(),
      count,
      level,
      commits: liveItems,
      repos: assignedRepos,
    };

    allDays.push(dayObj);
    currentWeek.push(dayObj);

    // Check if week is full (Sunday to Saturday)
    if (currentWeek.length === 7) {
      // Determine if a new month starts in this week
      let monthLabel: string | undefined = undefined;
      for (const d of currentWeek) {
        if (d && d.month !== lastMonthSeen && d.date.endsWith('-01')) {
          monthLabel = monthNames[d.month];
          lastMonthSeen = d.month;
          break;
        }
      }

      // If first week or gap between months, label first valid day month
      if (!monthLabel && (weeks.length === 0 || lastMonthSeen === -1)) {
        const firstValid = currentWeek.find((d) => d !== null);
        if (firstValid) {
          monthLabel = monthNames[firstValid.month];
          lastMonthSeen = firstValid.month;
        }
      } else if (!monthLabel && currentWeek[0] && currentWeek[0].month !== lastMonthSeen) {
        monthLabel = monthNames[currentWeek[0].month];
        lastMonthSeen = currentWeek[0].month;
      }

      weeks.push({
        weekIndex,
        days: currentWeek,
        monthLabel,
      });

      currentWeek = [];
      weekIndex++;
    }

    iterDate.setDate(iterDate.getDate() + 1);
  }

  // Calculate statistics
  let totalContributions = 0;
  let activeDaysCount = 0;
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let weekendContributions = 0;

  const dayOfWeekCounts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  let busiest = {
    date: allDays[allDays.length - 1]?.date || '2026-08-30',
    formattedDate: allDays[allDays.length - 1]?.formattedDate || 'Aug 30, 2026',
    count: 0,
  };

  allDays.forEach((day) => {
    totalContributions += day.count;
    dayOfWeekCounts[day.dayOfWeek] += day.count;

    if (day.dayOfWeek === 0 || day.dayOfWeek === 6) {
      weekendContributions += day.count;
    }

    if (day.count > busiest.count) {
      busiest = {
        date: day.date,
        formattedDate: day.formattedDate,
        count: day.count,
      };
    }

    if (day.count > 0) {
      activeDaysCount++;
      tempStreak++;
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    } else {
      tempStreak = 0;
    }
  });

  // Calculate current streak backwards from latest day
  for (let i = allDays.length - 1; i >= 0; i--) {
    if (allDays[i].count > 0) {
      currentStreak++;
    } else {
      // allow 1 day grace if looking at today vs yesterday
      if (i === allDays.length - 1) {
        continue;
      }
      break;
    }
  }

  // Determine busiest day of week
  let maxDayOfWeekIndex = 1;
  let maxDayOfWeekVal = 0;
  Object.entries(dayOfWeekCounts).forEach(([dow, cnt]) => {
    if (cnt > maxDayOfWeekVal) {
      maxDayOfWeekVal = cnt;
      maxDayOfWeekIndex = Number(dow);
    }
  });

  const stats: HeatmapSummaryStats = {
    totalContributions,
    currentStreak,
    longestStreak,
    activeDaysCount,
    busiestDay: busiest,
    busiestDayOfWeek: dayNames[maxDayOfWeekIndex],
    weekendContributionPct: totalContributions > 0 ? Math.round((weekendContributions / totalContributions) * 100) : 0,
  };

  return {
    weeks,
    allDays,
    stats,
  };
}
