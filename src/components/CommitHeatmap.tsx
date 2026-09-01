import React, { useState, useMemo, useRef } from 'react';
import {
  Calendar,
  Flame,
  Trophy,
  Activity,
  GitCommit,
  FolderGit2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info,
  Clock,
  Code2,
  Filter,
  Palette
} from 'lucide-react';
import { GitHubCommitItem } from '../utils/githubService';
import {
  generateContributionData,
  HeatmapDay,
  HeatmapWeek,
  HeatmapSummaryStats,
} from '../utils/heatmapData';

export type HeatmapTheme = 'github' | 'cyan' | 'purple' | 'amber';

interface CommitHeatmapProps {
  commits?: GitHubCommitItem[];
  isLoading?: boolean;
  className?: string;
  onSelectDate?: (date: string) => void;
}

export const CommitHeatmap: React.FC<CommitHeatmapProps> = ({
  commits = [],
  isLoading = false,
  className = '',
  onSelectDate,
}) => {
  const [selectedRange, setSelectedRange] = useState<'12m' | '6m' | '3m'>('12m');
  const [selectedTheme, setSelectedTheme] = useState<HeatmapTheme>('github');
  const [hoveredDay, setHoveredDay] = useState<{
    day: HeatmapDay;
    x: number;
    y: number;
  } | null>(null);
  const [activeSelectedDay, setActiveSelectedDay] = useState<HeatmapDay | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Determine week count based on selected range
  const weeksCount = useMemo(() => {
    switch (selectedRange) {
      case '3m':
        return 14;
      case '6m':
        return 26;
      case '12m':
      default:
        return 52;
    }
  }, [selectedRange]);

  // Generate heatmap data dynamically from commits
  const { weeks, stats } = useMemo(() => {
    return generateContributionData(commits, new Date('2026-08-31T00:00:00Z'), weeksCount);
  }, [commits, weeksCount]);

  // Theme color definitions for 0 to 4 levels
  const themeClasses: Record<HeatmapTheme, {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    activeRing: string;
    badge: string;
    accent: string;
  }> = {
    github: {
      0: 'bg-[#161b22] hover:bg-[#1f242c] border-[#1e293b]/40',
      1: 'bg-[#0e4429] hover:bg-[#125835] border-emerald-900/50',
      2: 'bg-[#006d32] hover:bg-[#00893f] border-emerald-800/60',
      3: 'bg-[#26a641] hover:bg-[#2fc44e] border-emerald-600/70',
      4: 'bg-[#39d353] hover:bg-[#4ae364] border-emerald-400/90 shadow-[0_0_8px_rgba(57,211,83,0.35)]',
      activeRing: 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-[#0f172a]',
      badge: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
      accent: 'text-emerald-400',
    },
    cyan: {
      0: 'bg-[#161b22] hover:bg-[#1f242c] border-[#1e293b]/40',
      1: 'bg-[#064e3b] hover:bg-[#065f46] border-cyan-900/50',
      2: 'bg-[#0e7490] hover:bg-[#0891b2] border-cyan-700/60',
      3: 'bg-[#06b6d4] hover:bg-[#22d3ee] border-cyan-500/70',
      4: 'bg-[#38bdf8] hover:bg-[#7dd3fc] border-sky-400/90 shadow-[0_0_8px_rgba(56,189,248,0.35)]',
      activeRing: 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#0f172a]',
      badge: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30',
      accent: 'text-cyan-400',
    },
    purple: {
      0: 'bg-[#161b22] hover:bg-[#1f242c] border-[#1e293b]/40',
      1: 'bg-[#3b0764] hover:bg-[#4c0519] border-purple-900/50',
      2: 'bg-[#6b21a8] hover:bg-[#7e22ce] border-purple-700/60',
      3: 'bg-[#9333ea] hover:bg-[#a855f7] border-purple-500/70',
      4: 'bg-[#c084fc] hover:bg-[#d8b4fe] border-purple-400/90 shadow-[0_0_8px_rgba(192,132,252,0.35)]',
      activeRing: 'ring-2 ring-purple-400 ring-offset-2 ring-offset-[#0f172a]',
      badge: 'bg-purple-950/60 text-purple-300 border-purple-500/30',
      accent: 'text-purple-400',
    },
    amber: {
      0: 'bg-[#161b22] hover:bg-[#1f242c] border-[#1e293b]/40',
      1: 'bg-[#451a03] hover:bg-[#78350f] border-amber-900/50',
      2: 'bg-[#b45309] hover:bg-[#d97706] border-amber-700/60',
      3: 'bg-[#f59e0b] hover:bg-[#fbbf24] border-amber-500/70',
      4: 'bg-[#fde047] hover:bg-[#fef08a] border-amber-400/90 shadow-[0_0_8px_rgba(253,224,71,0.35)]',
      activeRing: 'ring-2 ring-amber-400 ring-offset-2 ring-offset-[#0f172a]',
      badge: 'bg-amber-950/60 text-amber-300 border-amber-500/30',
      accent: 'text-amber-400',
    },
  };

  const currentTheme = themeClasses[selectedTheme];

  // Hover day handler with coordinate calculation
  const handleMouseEnter = (day: HeatmapDay, e: React.MouseEvent<HTMLButtonElement>) => {
    if (!containerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    setHoveredDay({
      day,
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top,
    });
  };

  const handleCellClick = (day: HeatmapDay) => {
    setActiveSelectedDay(activeSelectedDay?.date === day.date ? null : day);
    if (onSelectDate) {
      onSelectDate(day.date);
    }
  };

  return (
    <div
      id="commit-heatmap-container"
      ref={containerRef}
      className={`relative bg-[#0f172a] border border-[#1e293b] rounded-2xl p-5 sm:p-6 space-y-6 text-[#f8fafc] ${className}`}
    >
      {/* 1. Header Bar with Stats & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e293b]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0a0d12] border border-[#1e293b] flex items-center justify-center text-emerald-400">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
              <span>Contribution Heatmap</span>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-normal ${currentTheme.badge}`}>
                {stats.totalContributions} contributions
              </span>
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-sans">
            Weekly commit cadence and continuous deployment ledger across all public repositories.
          </p>
        </div>

        {/* Action Controls: Range Selector & Theme Toggle */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Range Selector */}
          <div className="flex items-center p-0.5 bg-[#0a0d12] border border-[#1e293b] rounded-xl text-xs font-mono">
            <button
              type="button"
              id="heatmap-range-12m"
              onClick={() => setSelectedRange('12m')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                selectedRange === '12m'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              12 Months
            </button>
            <button
              type="button"
              id="heatmap-range-6m"
              onClick={() => setSelectedRange('6m')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                selectedRange === '6m'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              6 Months
            </button>
            <button
              type="button"
              id="heatmap-range-3m"
              onClick={() => setSelectedRange('3m')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                selectedRange === '3m'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              90 Days
            </button>
          </div>

          {/* Palette Theme Selector */}
          <div className="flex items-center gap-1 p-1 bg-[#0a0d12] border border-[#1e293b] rounded-xl" title="Color Scheme">
            {(['github', 'cyan', 'purple', 'amber'] as HeatmapTheme[]).map((theme) => (
              <button
                key={theme}
                type="button"
                id={`heatmap-theme-${theme}`}
                onClick={() => setSelectedTheme(theme)}
                className={`w-5 h-5 rounded-md border transition-all cursor-pointer flex items-center justify-center ${
                  selectedTheme === theme ? 'scale-110 border-white ring-1 ring-white/30' : 'border-transparent opacity-60 hover:opacity-100'
                } ${
                  theme === 'github' ? 'bg-[#39d353]' : theme === 'cyan' ? 'bg-[#38bdf8]' : theme === 'purple' ? 'bg-[#c084fc]' : 'bg-[#f59e0b]'
                }`}
                aria-label={`Select ${theme} theme`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 2. Key Telemetry Metrics Mini Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-[#0a0d12] border border-[#1e293b] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-slate-400">Total Logged</div>
            <div className="text-lg font-bold font-mono text-white mt-0.5">
              {stats.totalContributions}
            </div>
          </div>
          <div className="w-7 h-7 rounded-md bg-[#0f172a] border border-[#1e293b] flex items-center justify-center text-blue-400">
            <GitCommit className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#0a0d12] border border-[#1e293b] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-slate-400">Current Streak</div>
            <div className="text-lg font-bold font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
              <Flame className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>{stats.currentStreak} Days</span>
            </div>
          </div>
          <div className="w-7 h-7 rounded-md bg-[#0f172a] border border-[#1e293b] flex items-center justify-center text-emerald-400">
            <Flame className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#0a0d12] border border-[#1e293b] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-slate-400">Longest Streak</div>
            <div className="text-lg font-bold font-mono text-amber-400 flex items-center gap-1 mt-0.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>{stats.longestStreak} Days</span>
            </div>
          </div>
          <div className="w-7 h-7 rounded-md bg-[#0f172a] border border-[#1e293b] flex items-center justify-center text-amber-400">
            <Trophy className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#0a0d12] border border-[#1e293b] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-slate-400">Peak Day</div>
            <div className="text-sm font-bold font-mono text-slate-200 mt-1 truncate max-w-[110px]" title={stats.busiestDay.formattedDate}>
              {stats.busiestDay.count} on {stats.busiestDayOfWeek.slice(0, 3)}
            </div>
          </div>
          <div className="w-7 h-7 rounded-md bg-[#0f172a] border border-[#1e293b] flex items-center justify-center text-purple-400">
            <Activity className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* 3. The Contribution Graph Grid */}
      <div className="relative overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-slate-700">
        <div className="inline-block min-w-full">
          
          {/* Month Labels Header Row */}
          <div className="flex text-[11px] font-mono text-slate-400 mb-2 pl-7">
            {weeks.map((week, idx) => (
              <div
                key={`month-hdr-${idx}`}
                className="w-3.5 sm:w-4 text-left shrink-0 overflow-visible"
              >
                {week.monthLabel ? (
                  <span className="text-slate-300 font-medium text-[11px] whitespace-nowrap">
                    {week.monthLabel}
                  </span>
                ) : null}
              </div>
            ))}
          </div>

          {/* Main Grid: Days of Week (Mon, Wed, Fri labels) + Week Columns */}
          <div className="flex gap-1.5 items-start">
            
            {/* Day of Week Labels (Sun, Mon, Tue, Wed, Thu, Fri, Sat) */}
            <div className="flex flex-col justify-between h-[106px] sm:h-[118px] text-[10px] font-mono text-slate-500 pr-1 select-none">
              <span className="h-3 sm:h-3.5 leading-none"></span>
              <span className="h-3 sm:h-3.5 leading-none">Mon</span>
              <span className="h-3 sm:h-3.5 leading-none"></span>
              <span className="h-3 sm:h-3.5 leading-none">Wed</span>
              <span className="h-3 sm:h-3.5 leading-none"></span>
              <span className="h-3 sm:h-3.5 leading-none">Fri</span>
              <span className="h-3 sm:h-3.5 leading-none"></span>
            </div>

            {/* Week Columns */}
            <div className="flex gap-1 sm:gap-1.5" id="github-heatmap-grid">
              {weeks.map((week) => (
                <div
                  key={`week-${week.weekIndex}`}
                  className="flex flex-col gap-1 sm:gap-1.5 shrink-0"
                >
                  {week.days.map((day, dayIdx) => {
                    if (!day) {
                      return (
                        <div
                          key={`empty-${week.weekIndex}-${dayIdx}`}
                          className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[3px] bg-transparent opacity-0 pointer-events-none"
                        />
                      );
                    }

                    const isSelected = activeSelectedDay?.date === day.date;
                    const levelClass = currentTheme[day.level];

                    return (
                      <button
                        key={`day-${day.date}`}
                        type="button"
                        id={`heatmap-cell-${day.date}`}
                        onClick={() => handleCellClick(day)}
                        onMouseEnter={(e) => handleMouseEnter(day, e)}
                        onMouseLeave={() => setHoveredDay(null)}
                        aria-label={`${day.count} contributions on ${day.formattedDate}`}
                        className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[3px] border transition-transform duration-150 cursor-pointer focus:outline-none ${levelClass} ${
                          isSelected ? currentTheme.activeRing : ''
                        } hover:scale-125 hover:z-10`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Floating Tooltip */}
        {hoveredDay && (
          <div
            id="heatmap-floating-tooltip"
            className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-full mb-2.5 px-3 py-2 rounded-xl bg-[#030712]/95 backdrop-blur-md border border-[#334155] shadow-2xl text-xs font-mono text-white space-y-1 w-max max-w-xs transition-opacity animate-in fade-in zoom-in-95 duration-100"
            style={{
              left: hoveredDay.x,
              top: hoveredDay.y,
            }}
          >
            <div className="font-semibold text-slate-100 flex items-center justify-between gap-3">
              <span>
                {hoveredDay.day.count > 0
                  ? `${hoveredDay.day.count} contribution${hoveredDay.day.count > 1 ? 's' : ''}`
                  : 'No contributions'}
              </span>
              <span className="text-[10px] text-slate-400 font-normal">
                {hoveredDay.day.date}
              </span>
            </div>
            
            <div className="text-[11px] text-slate-400 font-sans">
              {hoveredDay.day.formattedDate}
            </div>

            {hoveredDay.day.repos.length > 0 && (
              <div className="pt-1 mt-1 border-t border-[#1e293b] flex flex-wrap items-center gap-1">
                {hoveredDay.day.repos.slice(0, 2).map((repo) => (
                  <span
                    key={repo}
                    className="px-1.5 py-0.5 rounded bg-[#0f172a] border border-[#1e293b] text-[10px] text-blue-300 font-mono"
                  >
                    {repo}
                  </span>
                ))}
                {hoveredDay.day.repos.length > 2 && (
                  <span className="text-[10px] text-slate-500">
                    +{hoveredDay.day.repos.length - 2} more
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. Graph Legend & Activity Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-slate-500" />
          <span>Click any square to inspect granular daily commits &amp; repositories</span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <span className="text-[11px] text-slate-400">Less</span>
          <div className={`w-3 h-3 rounded-[3px] border ${currentTheme[0]}`} title="0 contributions" />
          <div className={`w-3 h-3 rounded-[3px] border ${currentTheme[1]}`} title="1-2 contributions" />
          <div className={`w-3 h-3 rounded-[3px] border ${currentTheme[2]}`} title="3-5 contributions" />
          <div className={`w-3 h-3 rounded-[3px] border ${currentTheme[3]}`} title="6-8 contributions" />
          <div className={`w-3 h-3 rounded-[3px] border ${currentTheme[4]}`} title="9+ contributions" />
          <span className="text-[11px] text-slate-400">More</span>
        </div>
      </div>

      {/* 5. Granular Selected Day Inspector (Expands on Click) */}
      {activeSelectedDay && (
        <div
          id="heatmap-selected-day-details"
          className="p-4 rounded-xl bg-[#0a0d12] border border-blue-500/30 space-y-3 animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center justify-between pb-2 border-b border-[#1e293b]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <h4 className="text-sm font-bold text-white font-mono">
                {activeSelectedDay.formattedDate}
              </h4>
              <span className={`text-[11px] px-2 py-0.5 rounded-full border font-mono ${currentTheme.badge}`}>
                {activeSelectedDay.count} {activeSelectedDay.count === 1 ? 'activity' : 'activities'} logged
              </span>
            </div>

            <button
              type="button"
              onClick={() => setActiveSelectedDay(null)}
              className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded bg-[#0f172a] border border-[#1e293b] cursor-pointer"
            >
              ✕ Close
            </button>
          </div>

          {activeSelectedDay.commits && activeSelectedDay.commits.length > 0 ? (
            <div className="space-y-2">
              <div className="text-xs font-mono text-slate-400">Verified Commit Ledger:</div>
              {activeSelectedDay.commits.map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-lg bg-[#0f172a] border border-[#1e293b] hover:border-slate-600 transition-colors flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-blue-950/70 border border-blue-500/30 text-blue-300 text-[10px]">
                        {c.shortSha}
                      </span>
                      <span className="text-slate-300 font-semibold">{c.repoName}</span>
                    </div>
                    <p className="text-slate-300 font-sans">{c.title}</p>
                  </div>

                  <a
                    href={c.commitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded bg-[#0a0d12] hover:bg-blue-600 text-slate-300 hover:text-white transition-colors font-mono text-[11px] cursor-pointer"
                  >
                    <span>Diff</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          ) : activeSelectedDay.count > 0 ? (
            <div className="space-y-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span>
                  Engineering activities occurred on {activeSelectedDay.repos.join(', ')}.
                </span>
              </div>
              <p className="text-slate-500 font-sans text-xs">
                Includes verified pushes, branch merges, pull requests, and telemetry commits.
              </p>
            </div>
          ) : (
            <div className="text-xs font-mono text-slate-500 py-1">
              No commit events recorded for this calendar date.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
