import {
  developerConfig,
  experienceData,
  skillCategories,
  educationCertificationsData,
  resumeSummary,
  featuredToolsData,
} from '../data/portfolioData';
import { generateResumePdf, GeneratePdfOptions } from './pdfGenerator';
import { generateResumeDocx } from './docxGenerator';

export { generateResumePdf, generateResumeDocx };
export type { GeneratePdfOptions };

/**
 * Generates ATS-optimized plain text representation of the resume.
 */
export function generateResumeText(): string {
  const divider = '============================================================';
  const subDivider = '------------------------------------------------------------';

  const contactLine = `Email: ${developerConfig.email} | Portfolio: shaheera-sadia.vercel.app | GitHub: ${developerConfig.github} | LinkedIn: ${developerConfig.linkedin}`;
  const locationLine = `Location: ${developerConfig.location} | Availability: ${resumeSummary.availability}`;

  const projectsBlock = featuredToolsData
    .map((tool) => {
      const live = tool.liveUrl ? `Live: ${tool.liveUrl}` : '';
      const repo = tool.githubUrl ? `Code: ${tool.githubUrl}` : '';
      const links = [live, repo].filter(Boolean).join(' | ');
      return `• ${tool.application.toUpperCase()} — ${tool.category}
  ${links}
  Problem Solved: ${tool.problemSolved}
  Architecture: ${tool.whatBuilt}
  Tech Stack: ${tool.keyTech}`;
    })
    .join('\n\n');

  const skillsBlock = skillCategories
    .map((cat) => {
      const skillsStr = cat.skills
        .map((s) => s.name)
        .join(', ');
      return `• ${cat.category.toUpperCase()}:\n  ${skillsStr}`;
    })
    .join('\n\n');

  const experienceBlock = experienceData
    .map((exp) => {
      const achievementsStr = exp.achievements.map((ach) => `  - ${ach}`).join('\n');
      return `${exp.role.toUpperCase()} | ${exp.company}
${exp.period} | ${exp.location}
${achievementsStr}
  Tech Stack: ${exp.technologies.join(', ')}`;
    })
    .join('\n\n' + subDivider + '\n\n');

  const certsBlock = educationCertificationsData
    .map((cert) => {
      const hoursStr = cert.hours ? ` (${cert.hours})` : '';
      return `• ${cert.title} — ${cert.issuer}${hoursStr}
  Issued: ${cert.issuedDate} [${cert.badge}]
  ${cert.description}`;
    })
    .join('\n\n');

  return `${developerConfig.name.toUpperCase()}
${developerConfig.role}
${contactLine}
${locationLine}

${divider}
PROFESSIONAL SUMMARY
${divider}
${resumeSummary.summary}

${divider}
TECHNICAL PROFICIENCIES & CORE SKILLS
${divider}
${skillsBlock}

${divider}
KEY FEATURED PRODUCTION PROJECTS
${divider}
${projectsBlock}

${divider}
PROFESSIONAL WORK EXPERIENCE
${divider}
${experienceBlock}

${divider}
ACCREDITED EDUCATION & CERTIFICATIONS
${divider}
${certsBlock}

${divider}
CORE ENGINEERING PRINCIPLES
${divider}
${developerConfig.principles.map((p) => `• ${p}`).join('\n')}
`;
}

/**
 * Generates Markdown representation of the resume.
 */
export function generateResumeMarkdown(): string {
  const contact = `[Email](mailto:${developerConfig.email}) • [Portfolio](https://shaheera-sadia.vercel.app) • [GitHub](${developerConfig.github}) • [LinkedIn](${developerConfig.linkedin}) • **${developerConfig.location}**`;

  const projectsSection = featuredToolsData
    .map((tool) => {
      const live = tool.liveUrl ? `[Live Demo](${tool.liveUrl})` : '';
      const repo = tool.githubUrl ? `[Source Code](${tool.githubUrl})` : '';
      const links = [live, repo].filter(Boolean).join(' • ');
      return `### ${tool.application} — *${tool.category}*
${links ? `${links}\n\n` : ''}- **Problem Solved:** ${tool.problemSolved}
- **Architecture:** ${tool.whatBuilt}
- **Technologies:** \`${tool.keyTech}\``;
    })
    .join('\n\n---\n\n');

  const skillsSection = skillCategories
    .map((cat) => {
      const skillsList = cat.skills
        .map((s) => `- **${s.name}**: ${s.focus}`)
        .join('\n');
      return `### ${cat.category}\n${skillsList}`;
    })
    .join('\n\n');

  const experienceSection = experienceData
    .map((exp) => {
      const achievements = exp.achievements.map((a) => `- ${a}`).join('\n');
      return `### ${exp.role} — ${exp.company}
*${exp.period} | ${exp.location}*

${achievements}

**Technologies:** \`${exp.technologies.join('`, `')}\``;
    })
    .join('\n\n---\n\n');

  const educationSection = educationCertificationsData
    .map((cert) => {
      const hours = cert.hours ? ` (${cert.hours})` : '';
      return `### ${cert.title} — ${cert.issuer}${hours}
*Issued: ${cert.issuedDate}* | **${cert.badge}**

${cert.description}
${cert.credentialUrl ? `[View Credential](${cert.credentialUrl})` : ''}`;
    })
    .join('\n\n');

  return `# ${developerConfig.name}
**${developerConfig.role}**  
${contact}

---

## Summary
${resumeSummary.summary}

---

## Technical Skills
${skillsSection}

---

## Key Featured Production Projects
${projectsSection}

---

## Professional Experience
${experienceSection}

---

## Education & Certifications
${educationSection}

---

## Core Engineering Principles
${developerConfig.principles.map((p) => `- ${p}`).join('\n')}
`;
}

/**
 * Generates standalone, printable HTML document representation of the resume.
 */
export function generateResumeHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${developerConfig.name} - Resume / CV</title>
  <style>
    @page { margin: 15mm; size: letter portrait; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      background: #ffffff;
      line-height: 1.5;
      max-width: 850px;
      margin: 0 auto;
      padding: 30px;
    }
    h1 { font-size: 28px; margin: 0 0 4px 0; color: #0f172a; font-weight: 800; }
    h2 { font-size: 16px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 24px; margin-bottom: 12px; color: #1e40af; }
    h3 { font-size: 14px; margin: 0 0 2px 0; color: #0f172a; }
    p { font-size: 12px; margin: 0 0 10px 0; color: #334155; }
    ul { margin: 4px 0 12px 16px; padding: 0; }
    li { font-size: 12px; margin-bottom: 4px; color: #334155; }
    .contact { font-size: 12px; color: #475569; margin-bottom: 16px; }
    .contact a { color: #2563eb; text-decoration: none; }
    .role-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
    .period { font-size: 11px; font-weight: 600; color: #64748b; font-family: monospace; }
    .tech-pill { display: inline-block; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 4px; padding: 1px 6px; font-size: 10px; font-family: monospace; margin: 2px 4px 2px 0; }
    @media print {
      body { padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="margin-bottom: 20px; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
    <span style="font-size: 12px; color: #64748b;">Shaheera Sadia - Official Curriculum Vitae</span>
    <button onclick="window.print()" style="background: #2563eb; color: white; border: none; padding: 6px 14px; border-radius: 6px; font-weight: bold; cursor: pointer;">Print / Save as PDF</button>
  </div>

  <h1>${developerConfig.name}</h1>
  <div style="font-size: 14px; font-weight: 600; color: #2563eb; margin-bottom: 6px;">${developerConfig.role}</div>
  <div class="contact">
    Email: <a href="mailto:${developerConfig.email}">${developerConfig.email}</a> •
    Portfolio: <a href="https://shaheera-sadia.vercel.app">shaheera-sadia.vercel.app</a> •
    GitHub: <a href="${developerConfig.github}">github.com/shaheerasadia</a> •
    LinkedIn: <a href="${developerConfig.linkedin}">${developerConfig.linkedin.replace('https://', '').replace(/^www\./, '').replace(/\/$/, '')}</a> •
    Location: ${developerConfig.location}
  </div>

  <h2>Professional Summary</h2>
  <p>${resumeSummary.summary}</p>

  <h2>Core Technical Skills</h2>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
    ${skillCategories
      .map(
        (cat) => `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px; border-radius: 6px;">
        <strong style="font-size: 12px; color: #0f172a; display: block; margin-bottom: 4px;">${cat.category}</strong>
        ${cat.skills
          .map(
            (s) => `<div style="font-size: 11px; display: flex; justify-content: space-between; margin-bottom: 2px;">
              <span style="font-weight: 600;">${s.name}</span>
              <span style="color: #64748b; font-size: 10px;">${s.focus}</span>
            </div>`
          )
          .join('')}
      </div>`
      )
      .join('')}
  </div>

  <h2>Key Featured Production Projects</h2>
  ${featuredToolsData
    .map(
      (p) => `
    <div style="margin-bottom: 14px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px; border-radius: 6px;">
      <div class="role-header">
        <h3 style="display: inline; font-size: 13px;">${p.application}</h3>
        <span style="font-size: 11px; color: #2563eb; font-weight: 600;">${p.category}</span>
      </div>
      <p style="margin: 3px 0 6px 0; font-size: 11px; color: #334155;"><strong>Problem Solved:</strong> ${p.problemSolved}</p>
      <p style="margin: 0 0 6px 0; font-size: 11px; color: #334155;"><strong>Architecture:</strong> ${p.whatBuilt}</p>
      <div style="font-size: 11px; margin-bottom: 6px;">
        ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" style="color: #2563eb; margin-right: 12px;">Live Demo ↗</a>` : ''}
        ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" style="color: #475569;">Source Code ↗</a>` : ''}
      </div>
      <div>
        <span class="tech-pill">${p.keyTech}</span>
      </div>
    </div>`
    )
    .join('')}

  <h2>Professional Work Experience</h2>
  ${experienceData
    .map(
      (exp) => `
    <div style="margin-bottom: 16px;">
      <div class="role-header">
        <div>
          <h3 style="display: inline;">${exp.role}</h3>
          <span style="color: #2563eb; font-weight: 600; font-size: 13px;"> — ${exp.company}</span>
        </div>
        <span class="period">${exp.period} | ${exp.location}</span>
      </div>
      <ul>
        ${exp.achievements.map((ach) => `<li>${ach}</li>`).join('')}
      </ul>
      <div>
        ${exp.technologies.map((t) => `<span class="tech-pill">${t}</span>`).join('')}
      </div>
    </div>`
    )
    .join('')}

  <h2>Accredited Education & Certifications</h2>
  ${educationCertificationsData
    .map(
      (cert) => `
    <div style="margin-bottom: 12px;">
      <div class="role-header">
        <h3 style="font-size: 13px;">${cert.title}</h3>
        <span class="period">${cert.issuedDate}</span>
      </div>
      <div style="font-size: 11px; color: #2563eb; font-weight: 600; margin-bottom: 2px;">${cert.issuer} ${cert.hours ? `• ${cert.hours}` : ''} • <span style="color: #059669;">${cert.badge}</span></div>
      <p style="margin: 0; font-size: 11px;">${cert.description}</p>
    </div>`
    )
    .join('')}
</body>
</html>`;
}

/**
 * Triggers a direct browser file download for the resume in chosen format.
 * - 'pdf': Native ATS & LinkedIn-compliant vector PDF via jsPDF
 * - 'docx': Microsoft Word document (.docx) via docx library
 * - 'txt': Plain text formatted for applicant tracking systems
 * - 'md': Markdown document
 * - 'html': Standalone HTML page
 * - 'print': Native browser print dialog
 */
export async function downloadResume(
  format: 'pdf' | 'docx' | 'txt' | 'md' | 'html' | 'print',
  options?: GeneratePdfOptions
): Promise<void> {
  const baseFilename = 'Shaheera_Sadia_Resume';

  if (format === 'print') {
    window.print();
    return;
  }

  if (format === 'pdf') {
    await generateResumePdf({
      filename: `${baseFilename}.pdf`,
      sourceElement: options?.sourceElement,
      mode: options?.mode || 'vector',
      onProgress: options?.onProgress,
    });
    return;
  }

  if (format === 'docx') {
    options?.onProgress?.('Generating Word document (.docx)...');
    await generateResumeDocx(`${baseFilename}.docx`);
    return;
  }

  let content = '';
  let filename = '';
  let mimeType = '';

  if (format === 'txt') {
    content = generateResumeText();
    filename = `${baseFilename}_ATS.txt`;
    mimeType = 'text/plain;charset=utf-8';
  } else if (format === 'md') {
    content = generateResumeMarkdown();
    filename = `${baseFilename}.md`;
    mimeType = 'text/markdown;charset=utf-8';
  } else if (format === 'html') {
    content = generateResumeHtml();
    filename = `${baseFilename}.html`;
    mimeType = 'text/html;charset=utf-8';
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
