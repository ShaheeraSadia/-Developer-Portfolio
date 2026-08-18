import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  ArrowUpRight,
  Github,
  ChevronRight,
  Search,
  X,
  SlidersHorizontal,
  FolderCode,
} from 'lucide-react';
import { Project } from '../types';
import { projectsData } from '../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

// Levenshtein distance helper for typo tolerance
function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}

// Multi-criteria fuzzy scoring algorithm
function calculateFuzzyScore(query: string, text: string): number {
  if (!query) return 1;
  const q = query.toLowerCase().trim();
  const t = text.toLowerCase().trim();

  if (!t) return 0;
  if (t === q) return 100;
  if (t.startsWith(q)) return 85 + Math.min((q.length / t.length) * 15, 10);
  if (t.includes(q)) return 70 + Math.min((q.length / t.length) * 15, 10);

  // Word-level matching & acronym / prefix matching
  const words = t.split(/[\s\-_\/,.:;]+/);
  
  // Check acronym match (e.g. "big" -> Brand Identity Generator)
  const acronym = words.map(w => w[0]).join('').toLowerCase();
  if (acronym.includes(q)) return 65;

  for (const word of words) {
    if (word === q) return 80;
    if (word.startsWith(q)) return 60 + Math.min((q.length / word.length) * 10, 10);
    if (word.includes(q)) return 50;
  }

  // Character subsequence fuzzy alignment
  let qIdx = 0;
  let consecutiveBonus = 0;
  let prevMatched = -1;
  for (let i = 0; i < t.length && qIdx < q.length; i++) {
    if (t[i] === q[qIdx]) {
      if (prevMatched === i - 1) consecutiveBonus += 4;
      prevMatched = i;
      qIdx++;
    }
  }

  if (qIdx === q.length) {
    return Math.min(30 + consecutiveBonus, 60);
  }

  // Typo tolerance for queries with length >= 3
  if (q.length >= 3) {
    for (const word of words) {
      if (Math.abs(word.length - q.length) <= 2) {
        const dist = levenshteinDistance(q, word);
        if (dist === 1) return 40;
        if (dist === 2 && q.length >= 5) return 25;
      }
    }
  }

  return 0;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'All',
    'Web Utilities & Design Systems',
    'Web Utilities & SaaS Engine',
    'Web Utilities & E-Commerce',
    'Creative AI Interfaces',
  ];

  const popularKeywords = [
    'React',
    'Web Workers',
    'Tailwind CSS',
    'Canvas',
    'Tokens',
    'LocalStorage',
    'Zero Latency',
  ];

  // Global hotkey to focus search bar (e.g. '/' key when not typing)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || '').toUpperCase();
      const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag);

      if ((e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) && !isTyping) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute fuzzy match scores and filter projects
  const { filteredProjects, hasSearch } = useMemo(() => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      const filtered = projectsData.filter(
        (project) => selectedCategory === 'All' || project.category === selectedCategory
      );
      return { filteredProjects: filtered, hasSearch: false };
    }

    const scored = projectsData
      .map((project) => {
        const matchesCategory =
          selectedCategory === 'All' || project.category === selectedCategory;

        if (!matchesCategory) {
          return { project, score: 0 };
        }

        // Weighted multi-field fuzzy scoring
        const titleScore = calculateFuzzyScore(trimmed, project.title) * 3.0;
        const stackScore = Math.max(...project.stack.map((t) => calculateFuzzyScore(trimmed, t)), 0) * 2.5;
        const categoryScore = calculateFuzzyScore(trimmed, project.category) * 2.0;
        const taglineScore = calculateFuzzyScore(trimmed, project.tagline) * 1.5;
        const summaryScore = calculateFuzzyScore(trimmed, project.summary) * 1.2;
        const decisionScore = Math.max(
          ...project.architecturalDecisions.map((d) => calculateFuzzyScore(trimmed, d)),
          0
        ) * 1.0;
        const challengeScore = Math.max(
          ...project.challenges.map((c) => calculateFuzzyScore(trimmed, c)),
          0
        ) * 1.0;

        const maxScore = Math.max(
          titleScore,
          stackScore,
          categoryScore,
          taglineScore,
          summaryScore,
          decisionScore,
          challengeScore
        );

        return { project, score: maxScore };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.project);

    return { filteredProjects: scored, hasSearch: true };
  }, [searchQuery, selectedCategory]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    searchInputRef.current?.focus();
  };

  return (
    <section id="projects" className="py-24 sm:py-28 md:py-32 border-b border-[#E7E6E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Clear Typography and mb-14 spacing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-14 border-b border-[#E7E6E2]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#64666E] uppercase tracking-wider">
              <span className="text-[#2F5CFF] font-bold">02.</span>
              <span>FEATURED_PROJECTS</span>
              <span className="text-[#9E9EA7]">//</span>
              <span>CLIENT_SIDE_UTILITIES_&amp;_ENGINES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#14151A]">
              Featured projects &amp; web utilities.
            </h2>
          </div>
          <p className="text-base text-[#555761] max-w-md font-sans leading-relaxed">
            Deep-dives into Brand Identity Generator, Toolkit Pro, App Tool Shopping Hub, and off-thread browser engines.
          </p>
        </div>

        {/* Filter & Fuzzy Search Toolbar */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Category Chips */}
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter projects by category">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`filter-cat-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#14151A] text-white font-medium shadow-2xs'
                      : 'bg-[#F4F3EF] text-[#64666E] hover:text-[#14151A] hover:bg-[#EAE8E2] border border-[#E7E6E2]'
                  }`}
                >
                  {cat === 'All' ? '// all_work' : cat}
                </button>
              ))}
            </div>

            {/* Fuzzy Search Input Field */}
            <div className="relative w-full lg:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#64666E]">
                <Search className="w-4 h-4 text-[#64666E]" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                id="project-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Fuzzy search title, stack, keyword..."
                className="w-full pl-9 pr-16 py-2.5 text-xs font-mono bg-white border border-[#D5D4CE] rounded-lg text-[#14151A] placeholder:text-[#9E9EA7] focus:outline-hidden focus:border-[#2F5CFF] focus:ring-1 focus:ring-[#2F5CFF] transition-all shadow-2xs"
                aria-label="Fuzzy search projects by title, stack, or keywords"
              />
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center gap-1">
                {searchQuery ? (
                  <button
                    id="clear-project-search-btn"
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-[#64666E] hover:text-[#14151A] rounded hover:bg-[#EAE8E2] transition-colors"
                    aria-label="Clear search text"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-[#F4F3EF] border border-[#E7E6E2] rounded text-[10px] font-mono text-[#64666E]">
                    /
                  </kbd>
                )}
              </div>
            </div>
          </div>

          {/* Quick Keyword Suggestion Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-[#64666E] text-xs flex items-center gap-1 mr-1">
              <SlidersHorizontal className="w-3 h-3 text-[#2F5CFF]" />
              <span>Quick tags:</span>
            </span>
            {popularKeywords.map((kw) => (
              <button
                key={kw}
                onClick={() => setSearchQuery(kw)}
                className={`px-2.5 py-1 rounded-md text-xs border transition-colors ${
                  searchQuery.toLowerCase() === kw.toLowerCase()
                    ? 'bg-[#2F5CFF] text-white border-[#2F5CFF]'
                    : 'bg-white text-[#44464F] border-[#E7E6E2] hover:bg-[#F4F3EF] hover:text-[#14151A]'
                }`}
              >
                #{kw}
              </button>
            ))}
            {(searchQuery || selectedCategory !== 'All') && (
              <button
                onClick={handleClearFilters}
                className="ml-auto text-xs text-[#2F5CFF] hover:underline font-mono font-medium"
              >
                reset_filters
              </button>
            )}
          </div>
        </div>

        {/* Results Counter & Search Indicator */}
        {(hasSearch || selectedCategory !== 'All') && (
          <div className="pb-4 flex items-center justify-between text-xs font-mono text-[#64666E]">
            <div>
              <span>Found </span>
              <span className="font-bold text-[#14151A]">{filteredProjects.length}</span>
              <span> project{filteredProjects.length === 1 ? '' : 's'}</span>
              {searchQuery && (
                <span>
                  {' '}
                  matching fuzzy query <span className="text-[#2F5CFF] font-semibold">&quot;{searchQuery}&quot;</span>
                </span>
              )}
            </div>
            {filteredProjects.length > 0 && hasSearch && (
              <span className="text-xs text-[#1FAA6E] font-medium">✓ Sorted by relevance</span>
            )}
          </div>
        )}

        {/* Editorial Project Rows List (Clean Typography, Aligned Metadata, Right-Pushed Live CTAs) */}
        <div className="divide-y divide-[#E7E6E2] border-y border-[#E7E6E2]">
          {filteredProjects.length === 0 ? (
            <div className="py-16 text-center space-y-3 font-mono">
              <p className="text-sm font-semibold text-[#14151A]">
                No projects matched &quot;{searchQuery}&quot;
              </p>
              <p className="text-xs text-[#64666E] max-w-md mx-auto">
                Try searching for technologies like <span className="text-[#2F5CFF]">React</span>, <span className="text-[#2F5CFF]">Web Workers</span>, <span className="text-[#2F5CFF]">Canvas</span>, or reset the active category filter.
              </p>
              <div className="pt-2">
                <button
                  id="reset-search-empty-btn"
                  onClick={handleClearFilters}
                  className="px-4 py-2 rounded-lg bg-[#14151A] text-white text-xs font-mono hover:bg-[#2F5CFF] transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <article
                key={project.id}
                id={`project-row-${project.id}`}
                className="group py-8 sm:py-10 transition-colors hover:bg-[#F4F3EF]/50 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Metadata Tags & Year (JetBrains Mono text-sm) */}
                  <div className="lg:col-span-3 space-y-2.5 font-mono text-sm text-[#64666E]">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-[#EAE8E2] text-[#14151A] font-bold text-xs">
                        {project.year}
                      </span>
                      <span className="text-[#2F5CFF] font-semibold text-xs">{project.category}</span>
                    </div>

                    <div className="space-y-1.5 pt-1 text-xs">
                      <div>
                        <span className="text-[#9E9EA7]">role: </span>
                        <span className="text-[#14151A] font-medium">{project.role}</span>
                      </div>
                      <div>
                        <span className="text-[#9E9EA7]">context: </span>
                        <span className="text-[#14151A] font-medium">{project.clientOrContext}</span>
                      </div>
                      <div>
                        <span className="text-[#9E9EA7]">status: </span>
                        <span className="text-[#1FAA6E] font-semibold">● validated</span>
                      </div>
                    </div>
                  </div>

                  {/* Center Column: Project Title (text-xl font-semibold) & Body Copy (text-base font-sans) */}
                  <div className="lg:col-span-5 space-y-3">
                    <h3 className="text-xl font-semibold tracking-tight text-[#14151A] group-hover:text-[#2F5CFF] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-base text-[#44464F] leading-relaxed font-sans">
                      {project.tagline}
                    </p>

                    {/* Proof Metrics Chips */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.metrics.map((metric, i) => (
                        <div
                          key={i}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-[#E7E6E2] text-xs font-mono shadow-2xs"
                        >
                          <span className="text-[#64666E]">{metric.label}:</span>
                          <span className="font-bold text-[#14151A]">{metric.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stack Badges with Click-to-Search */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.stack.map((tech) => (
                        <button
                          key={tech}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSearchQuery(tech);
                          }}
                          title={`Filter projects by ${tech}`}
                          className={`px-2.5 py-0.5 text-xs font-mono rounded-md transition-colors ${
                            searchQuery.toLowerCase() === tech.toLowerCase()
                              ? 'bg-[#2F5CFF] text-white'
                              : 'text-[#64666E] bg-[#EAE8E2] hover:bg-[#D5D4CE] hover:text-[#14151A]'
                          }`}
                        >
                          #{tech}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Pushed Effortless CTAs (Live Demo 🚀, GitHub 💻, Case Study) */}
                  <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-between lg:justify-start gap-2.5 pt-1">
                    {/* Primary Live Demo CTA (Electric Cobalt Button with ↗ Icon) */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#2F5CFF] text-white text-xs sm:text-sm font-mono font-bold hover:bg-[#254BD8] transition-colors shadow-2xs group/demo w-full sm:w-auto"
                        title="Open Live Application Demo"
                      >
                        <span>Live Demo</span>
                        <span aria-hidden="true">🚀</span>
                        <ArrowUpRight className="w-4 h-4 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform" />
                      </a>
                    )}

                    {/* GitHub Code Repository CTA with Octocat Icon */}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#D5D4CE] text-[#14151A] text-xs font-mono font-semibold hover:bg-[#F4F3EF] hover:border-[#14151A] transition-colors shadow-2xs w-full sm:w-auto"
                        title="View Source Code on GitHub"
                      >
                        <Github className="w-4 h-4 text-[#14151A]" />
                        <span>GitHub Code</span>
                        <span aria-hidden="true">💻</span>
                      </a>
                    )}

                    {/* Inspect Deep-Dive Case Study Button */}
                    <button
                      id={`inspect-case-study-${project.id}`}
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-[#64666E] hover:text-[#2F5CFF] hover:bg-white transition-colors w-full sm:w-auto"
                    >
                      <span>inspect_case_study</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
