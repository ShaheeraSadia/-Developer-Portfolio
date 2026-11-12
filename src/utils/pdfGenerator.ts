import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {
  developerConfig,
  experienceData,
  skillCategories,
  educationCertificationsData,
  resumeSummary,
  featuredToolsData,
} from '../data/portfolioData';

export interface GeneratePdfOptions {
  filename?: string;
  sourceElement?: HTMLElement | null;
  mode?: 'vector' | 'canvas';
  onProgress?: (stage: string) => void;
}

/**
 * Generates an ATS-compliant and recruiter-ready native vector PDF.
 * Uses native jsPDF text operators so that resume parsers (LinkedIn, Workday, Greenhouse, Taleo)
 * can extract text, Experience, Education, and Skills directly.
 */
export function generateNativeVectorPdf(filename = 'Shaheera_Sadia_Resume.pdf'): void {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 38;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  function checkPageBreak(neededHeight: number): boolean {
    if (y + neededHeight > pageHeight - margin - 20) {
      doc.addPage();
      y = margin + 8;
      return true;
    }
    return false;
  }

  // Document metadata embedded in PDF dictionary for parsers
  doc.setProperties({
    title: `${developerConfig.name} - Resume`,
    subject: 'Curriculum Vitae / Professional Resume',
    author: developerConfig.name,
    keywords: 'Resume, Curriculum Vitae, Front-End Developer, React, JavaScript, Web Developer, Portfolio',
  });

  // Top Name Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42); // #0f172a
  doc.text(developerConfig.name.toUpperCase(), margin, y + 14);
  y += 20;

  // Single Role Title — completely consistent with portfolio
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(37, 99, 235); // #2563eb
  doc.text(`${developerConfig.role}   |   Web Applications Since 2021`, margin, y + 8);
  y += 15;

  // Contact Info Line 1 & Line 2 (Cleanly formatted into 2 lines so LinkedIn is never cut off)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105); // #475569

  doc.text(
    `Email: ${developerConfig.email}   |   Location: ${developerConfig.location}   |   Portfolio: shaheera-sadia.vercel.app`,
    margin,
    y + 7
  );
  y += 12;

  doc.text(
    `GitHub: github.com/shaheerasadia   |   LinkedIn: linkedin.com/in/shaheera-sadia-038944374`,
    margin,
    y + 7
  );
  y += 14;

  // Header separator
  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(1.5);
  doc.line(margin, y, margin + contentWidth, y);
  y += 12;

  function renderSectionHeader(title: string) {
    checkPageBreak(28);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(30, 64, 175); // #1e40af
    doc.text(title.toUpperCase(), margin, y + 8);
    y += 12;
    doc.setDrawColor(203, 213, 225); // #cbd5e1
    doc.setLineWidth(0.75);
    doc.line(margin, y, margin + contentWidth, y);
    y += 9;
  }

  // 1. PROFESSIONAL SUMMARY
  renderSectionHeader('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85); // #334155
  const summaryLines = doc.splitTextToSize(resumeSummary.summary, contentWidth);
  doc.text(summaryLines, margin, y + 7);
  y += summaryLines.length * 11.5 + 6;

  // 2. TECHNICAL PROFICIENCIES & CORE SKILLS
  renderSectionHeader('Technical Skills & Core Proficiencies');
  for (const cat of skillCategories) {
    checkPageBreak(16);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    const catLabel = `${cat.category}: `;
    doc.text(catLabel, margin, y + 7);
    const catWidth = doc.getTextWidth(catLabel);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const skillsList = cat.skills.map((s) => s.name).join(', ');
    const skillLines = doc.splitTextToSize(skillsList, contentWidth - catWidth);
    doc.text(skillLines, margin + catWidth, y + 7);
    y += skillLines.length * 11 + 2;
  }
  y += 4;

  // 3. KEY FEATURED PRODUCTION PROJECTS (Kept unified on Page 1 without overlap)
  renderSectionHeader('Key Featured Production Projects');

  for (const tool of featuredToolsData) {
    checkPageBreak(46);

    // Line 1: Project Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(tool.application, margin, y + 7);
    y += 11;

    // Line 2: Stack (Dedicated line, never overlapping with title)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(37, 99, 235);
    doc.text(`Stack: ${tool.keyTech}`, margin + 6, y + 7);
    y += 10;

    // Line 3: Architecture & Problem Solved
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const impactText = `• Problem: ${tool.problemSolved} Built: ${tool.whatBuilt}`;
    const impactLines = doc.splitTextToSize(impactText, contentWidth - 10);
    doc.text(impactLines, margin + 6, y + 7);
    y += impactLines.length * 10.5 + 2;

    // Line 4: Live & Source Code Links
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Live Demo: ${tool.liveUrl}   |   Source Code: ${tool.githubUrl}`, margin + 6, y + 6);
    y += 12;
  }

  // 4. INDEPENDENT PROJECTS & ENGINEERING EXPERIENCE
  renderSectionHeader('Independent Projects & Engineering Experience');

  for (const exp of experienceData) {
    checkPageBreak(45);
    // Role & Company
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(exp.role, margin, y + 8);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(37, 99, 235);
    const roleWidth = doc.getTextWidth(exp.role);
    doc.text(` — ${exp.company}`, margin + roleWidth, y + 8);

    // Period & Location (Right aligned)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    const dateText = `${exp.period}  |  ${exp.location}`;
    const dateWidth = doc.getTextWidth(dateText);
    doc.text(dateText, margin + contentWidth - dateWidth, y + 8);
    y += 13;

    // Bullet points
    for (const ach of exp.achievements) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      const achLines = doc.splitTextToSize(ach, contentWidth - 14);
      checkPageBreak(achLines.length * 11 + 3);
      doc.text('•', margin + 3, y + 7);
      doc.text(achLines, margin + 14, y + 7);
      y += achLines.length * 11 + 2;
    }

    // Tech Stack line
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('Technologies: ', margin + 14, y + 6);
    const techLabelWidth = doc.getTextWidth('Technologies: ');
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(exp.technologies.join(', '), margin + 14 + techLabelWidth, y + 6);
    y += 12;
  }

  // 5. ACCREDITED CERTIFICATIONS & EDUCATION
  renderSectionHeader('Accredited Certifications & Education');

  for (const cert of educationCertificationsData) {
    checkPageBreak(36);
    // Line 1: Title (Bold 9.5pt)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(cert.title, margin, y + 8);
    y += 12;

    // Line 2: Issuer & Date (Dedicated line, NO HORIZONTAL OVERLAP)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(37, 99, 235);
    const issuerInfo = `${cert.issuer}  |  Issued: ${cert.issuedDate}  |  ${cert.badge}`;
    doc.text(issuerInfo, margin + 6, y + 7);
    y += 11;

    // Line 3: Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    const descLines = doc.splitTextToSize(cert.description, contentWidth - 8);
    doc.text(descLines, margin + 6, y + 7);
    y += descLines.length * 11 + 2;

    // Line 4: Credential Verification Link
    if (cert.credentialUrl) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(37, 99, 235);
      doc.text(`Verify Credential: ${cert.credentialUrl}`, margin + 6, y + 6);
      y += 12;
    }
  }

  // 6. CORE ENGINEERING PRINCIPLES
  renderSectionHeader('Core Engineering Principles');
  for (const principle of developerConfig.principles) {
    checkPageBreak(14);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.text(`•  ${principle}`, margin + 6, y + 7);
    y += 11;
  }

  // Add Clean Page Numbers (Without fake ATS verification label)
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // #94a3b8
    doc.text(
      `${developerConfig.name} — Curriculum Vitae | Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 18,
      { align: 'center' }
    );
  }

  doc.save(filename);
}

/**
 * Creates an off-screen HTML element for html2canvas visual render.
 */
function createResumePdfContainer(): HTMLDivElement {
  const container = document.createElement('div');
  container.id = 'pdf-resume-render-container';
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '800px';
  container.style.backgroundColor = '#ffffff';
  container.style.color = '#0f172a';
  container.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  container.style.padding = '36px 44px';
  container.style.boxSizing = 'border-box';
  container.style.zIndex = '-9999';

  container.innerHTML = `
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 16px; margin-bottom: 18px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em;">
            ${developerConfig.name}
          </h1>
          <p style="margin: 4px 0 0 0; font-size: 13px; font-weight: 600; color: #2563eb;">
            ${developerConfig.role} &bull; Since 2021
          </p>
        </div>
        <div style="text-align: right; font-size: 11px; color: #475569; line-height: 1.5;">
          <div><strong style="color: #0f172a;">Email:</strong> ${developerConfig.email}</div>
          <div><strong style="color: #0f172a;">Location:</strong> ${developerConfig.location}</div>
          <div><strong style="color: #0f172a;">Portfolio:</strong> shaheera-sadia.vercel.app</div>
          <div><strong style="color: #0f172a;">GitHub:</strong> github.com/shaheerasadia</div>
          <div><strong style="color: #0f172a;">LinkedIn:</strong> linkedin.com/in/shaheera-sadia-038944374</div>
        </div>
      </div>

      <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid #e2e8f0;">
        <h2 style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #1e40af;">
          Professional Summary
        </h2>
        <p style="margin: 0; font-size: 11.5px; color: #334155; line-height: 1.5;">
          ${resumeSummary.summary}
        </p>
      </div>
    </div>

    <!-- Technical Proficiencies -->
    <div style="margin-bottom: 18px;">
      <h2 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #1e40af; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">
        Core Technical Skills & Proficiencies
      </h2>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
        ${skillCategories
          .map(
            (cat) => `
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 10px;">
            <div style="font-size: 11px; font-weight: 700; color: #0f172a; margin-bottom: 4px;">
              ${cat.category}
            </div>
            <div style="font-size: 10px; color: #334155; line-height: 1.4;">
              ${cat.skills
                .map(
                  (s) =>
                    `<span style="display: inline-block; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 1px 5px; margin: 2px 2px 2px 0; font-weight: 500;">
                      ${s.name}
                    </span>`
                )
                .join('')}
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>

    <!-- Key Featured Production Projects -->
    <div style="margin-bottom: 18px;">
      <h2 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #1e40af; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">
        Key Featured Production Projects
      </h2>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${featuredToolsData
          .map(
            (p) => `
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 10px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
              <span style="font-size: 11.5px; font-weight: 700; color: #0f172a;">${p.application}</span>
              <span style="font-size: 9.5px; font-weight: 600; color: #2563eb;">${p.category}</span>
            </div>
            <div style="font-size: 10px; font-weight: 600; color: #2563eb; margin-bottom: 2px;">
              Stack: ${p.keyTech}
            </div>
            <div style="font-size: 10px; color: #475569; line-height: 1.4; margin-bottom: 3px;">
              ${p.description}
            </div>
            <div style="font-size: 9.5px;">
              <a href="${p.liveUrl}" style="color: #2563eb; text-decoration: none; margin-right: 10px;">Live Demo ↗</a>
              <a href="${p.githubUrl}" style="color: #475569; text-decoration: none;">Source Code ↗</a>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>

    <!-- Independent Projects & Engineering Experience -->
    <div style="margin-bottom: 18px;">
      <h2 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #1e40af; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">
        Independent Projects & Engineering Experience
      </h2>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${experienceData
          .map(
            (exp) => `
          <div style="border-left: 2px solid #3b82f6; padding-left: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
              <div>
                <span style="font-size: 12px; font-weight: 700; color: #0f172a;">${exp.role}</span>
                <span style="font-size: 12px; font-weight: 600; color: #2563eb;"> — ${exp.company}</span>
              </div>
              <span style="font-size: 10px; font-weight: 600; color: #64748b; font-family: monospace;">
                ${exp.period} | ${exp.location}
              </span>
            </div>
            <ul style="margin: 2px 0 4px 14px; padding: 0;">
              ${exp.achievements
                .map(
                  (ach) => `
                <li style="font-size: 10px; color: #334155; line-height: 1.4; margin-bottom: 2px;">
                  ${ach}
                </li>
              `
                )
                .join('')}
            </ul>
            <div style="font-size: 9.5px; color: #64748b;">
              <strong>Technologies:</strong> ${exp.technologies.join(', ')}
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>

    <!-- Accredited Education & Certifications -->
    <div>
      <h2 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #1e40af; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">
        Accredited Certifications & Education
      </h2>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
        ${educationCertificationsData
          .map(
            (cert) => `
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 10px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2px;">
              <span style="font-size: 11px; font-weight: 700; color: #0f172a;">${cert.title}</span>
              <span style="font-size: 8.5px; font-weight: 600; color: #059669; background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 3px; padding: 1px 4px; white-space: nowrap;">
                ${cert.badge}
              </span>
            </div>
            <div style="font-size: 10px; color: #2563eb; font-weight: 600; margin-bottom: 2px;">
              ${cert.issuer} ${cert.hours ? `• ${cert.hours}` : ''} • ${cert.issuedDate}
            </div>
            <div style="font-size: 9.5px; color: #475569; line-height: 1.4;">
              ${cert.description}
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `;

  return container;
}

/**
 * Renders an image-based PDF using html2canvas & jsPDF.
 */
async function generateCanvasPdf(options: GeneratePdfOptions): Promise<void> {
  const {
    filename = 'Shaheera_Sadia_Resume.pdf',
    sourceElement = null,
    onProgress,
  } = options;

  let targetElement: HTMLElement;
  let isTemporary = false;

  if (sourceElement && document.body.contains(sourceElement)) {
    targetElement = sourceElement;
  } else {
    onProgress?.('Preparing resume content...');
    targetElement = createResumePdfContainer();
    document.body.appendChild(targetElement);
    isTemporary = true;
  }

  try {
    onProgress?.('Rendering high-resolution vector canvas...');
    const canvas = await html2canvas(targetElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 850,
    });

    onProgress?.('Compiling PDF pages...');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position -= pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }

    onProgress?.('Saving file...');
    pdf.save(filename);
  } finally {
    if (isTemporary && targetElement && targetElement.parentNode) {
      targetElement.parentNode.removeChild(targetElement);
    }
  }
}

/**
 * Main PDF download entry point.
 * By default, generates a 100% Native Vector Text PDF with jsPDF so that
 * LinkedIn, Workday, Greenhouse, and all ATS algorithms can parse Experience,
 * Education, and Skills.
 */
export async function generateResumePdf(options: GeneratePdfOptions = {}): Promise<void> {
  const {
    filename = 'Shaheera_Sadia_Resume.pdf',
    mode = 'vector',
    onProgress,
  } = options;

  if (mode === 'canvas') {
    await generateCanvasPdf(options);
    return;
  }

  onProgress?.('Compiling native text PDF...');
  generateNativeVectorPdf(filename);
}
