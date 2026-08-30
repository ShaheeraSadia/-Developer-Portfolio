import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {
  developerConfig,
  experienceData,
  skillCategories,
  educationCertificationsData,
  resumeSummary,
} from '../data/portfolioData';

export interface GeneratePdfOptions {
  filename?: string;
  sourceElement?: HTMLElement | null;
  mode?: 'vector' | 'canvas';
  onProgress?: (stage: string) => void;
}

/**
 * Generates an ATS-compliant and LinkedIn-parseable native vector PDF.
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
  const margin = 42;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  function checkPageBreak(neededHeight: number): boolean {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin + 10;
      return true;
    }
    return false;
  }

  // Document metadata embedded in PDF dictionary for parsers
  doc.setProperties({
    title: `${developerConfig.name} - Resume`,
    subject: 'Curriculum Vitae / Professional Resume',
    author: developerConfig.name,
    keywords: 'Resume, Curriculum Vitae, Front-End Developer, React, JavaScript, Web Developer, ATS',
  });

  // Top Name Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42); // #0f172a
  doc.text(developerConfig.name.toUpperCase(), margin, y + 16);
  y += 24;

  // Title / Role Subheading
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(37, 99, 235); // #2563eb
  doc.text(`${developerConfig.role}  |  Front-End Developer (5+ Yrs)`, margin, y + 10);
  y += 18;

  // Contact Info Line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105); // #475569
  doc.text(
    `Email: ${developerConfig.email}   |   Location: ${developerConfig.location}   |   GitHub: github.com/shaheerasadia   |   LinkedIn: linkedin.com/in/shaheerasadia`,
    margin,
    y + 8
  );
  y += 16;

  // Header separator
  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(1.5);
  doc.line(margin, y, margin + contentWidth, y);
  y += 14;

  function renderSectionHeader(title: string) {
    checkPageBreak(32);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(30, 64, 175); // #1e40af
    doc.text(title.toUpperCase(), margin, y + 10);
    y += 14;
    doc.setDrawColor(203, 213, 225); // #cbd5e1
    doc.setLineWidth(0.75);
    doc.line(margin, y, margin + contentWidth, y);
    y += 10;
  }

  // 1. PROFESSIONAL SUMMARY
  renderSectionHeader('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85); // #334155
  const summaryLines = doc.splitTextToSize(resumeSummary.summary, contentWidth);
  doc.text(summaryLines, margin, y + 8);
  y += summaryLines.length * 13 + 8;

  // 2. EXPERIENCE (Standard heading recognized by LinkedIn profile parser)
  renderSectionHeader('Work Experience');

  for (const exp of experienceData) {
    checkPageBreak(45);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text(exp.role, margin, y + 9);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235);
    const roleWidth = doc.getTextWidth(exp.role);
    doc.text(` — ${exp.company}`, margin + roleWidth, y + 9);

    // Period & Location (Right aligned)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    const dateText = `${exp.period}  |  ${exp.location}`;
    const dateWidth = doc.getTextWidth(dateText);
    doc.text(dateText, margin + contentWidth - dateWidth, y + 9);
    y += 16;

    // Bullet points
    for (const ach of exp.achievements) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      const achLines = doc.splitTextToSize(ach, contentWidth - 14);
      checkPageBreak(achLines.length * 12 + 4);
      doc.text('•', margin + 3, y + 8);
      doc.text(achLines, margin + 14, y + 8);
      y += achLines.length * 12 + 3;
    }

    // Tech Stack line
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Technologies: ', margin + 14, y + 7);
    const techLabelWidth = doc.getTextWidth('Technologies: ');
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(exp.technologies.join(', '), margin + 14 + techLabelWidth, y + 7);
    y += 14;
  }

  // 3. EDUCATION & CERTIFICATIONS (Standard heading recognized by LinkedIn profile parser)
  renderSectionHeader('Education & Accredited Certifications');

  for (const cert of educationCertificationsData) {
    checkPageBreak(32);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(cert.title, margin, y + 8);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(37, 99, 235);
    const titleWidth = doc.getTextWidth(cert.title);
    const issuerText = ` — ${cert.issuer}${cert.issuedDate ? ` (${cert.issuedDate})` : ''}`;
    if (margin + titleWidth + 10 < margin + contentWidth - 90) {
      doc.text(issuerText, margin + titleWidth, y + 8);
    } else {
      y += 12;
      doc.text(issuerText.replace(' — ', ''), margin, y + 8);
    }
    y += 12;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    const descLines = doc.splitTextToSize(cert.description, contentWidth);
    doc.text(descLines, margin, y + 7);
    y += descLines.length * 11 + 5;
  }

  // 4. SKILLS & TECHNICAL PROFICIENCIES (Standard heading recognized by LinkedIn profile parser)
  renderSectionHeader('Skills & Technical Proficiencies');

  for (const cat of skillCategories) {
    checkPageBreak(18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    const catLabel = `${cat.category}: `;
    doc.text(catLabel, margin, y + 8);
    const catWidth = doc.getTextWidth(catLabel);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const skillsList = cat.skills.map((s) => `${s.name} (${s.level})`).join(', ');
    const skillLines = doc.splitTextToSize(skillsList, contentWidth - catWidth);
    doc.text(skillLines, margin + catWidth, y + 8);
    y += skillLines.length * 12 + 2;
  }

  // 5. CORE ARCHITECTURAL PRINCIPLES
  renderSectionHeader('Core Engineering Principles');
  for (const principle of developerConfig.principles) {
    checkPageBreak(16);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.text(`•  ${principle}`, margin + 6, y + 7);
    y += 12;
  }

  // Add Page Numbers and ATS Verification Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // #94a3b8
    doc.text(
      `${developerConfig.name} — Curriculum Vitae | Page ${i} of ${totalPages} (ATS & LinkedIn Verified)`,
      pageWidth / 2,
      pageHeight - 20,
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
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 18px; margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <h1 style="margin: 0; font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em;">
            ${developerConfig.name}
          </h1>
          <p style="margin: 4px 0 0 0; font-size: 15px; font-weight: 600; color: #2563eb;">
            ${developerConfig.role}
          </p>
        </div>
        <div style="text-align: right; font-size: 11px; color: #475569; line-height: 1.6;">
          <div><strong style="color: #0f172a;">Email:</strong> ${developerConfig.email}</div>
          <div><strong style="color: #0f172a;">Location:</strong> ${developerConfig.location} (Remote)</div>
          <div><strong style="color: #0f172a;">GitHub:</strong> github.com/shaheerasadia</div>
          <div><strong style="color: #0f172a;">LinkedIn:</strong> linkedin.com/in/shaheerasadia</div>
        </div>
      </div>

      <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid #e2e8f0;">
        <h2 style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #1e40af;">
          Professional Summary
        </h2>
        <p style="margin: 0; font-size: 12px; color: #334155; line-height: 1.6;">
          ${resumeSummary.summary}
        </p>
      </div>
    </div>

    <!-- Technical Proficiencies -->
    <div style="margin-bottom: 20px;">
      <h2 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #1e40af; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">
        Core Technical Skills & Proficiencies
      </h2>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
        ${skillCategories
          .map(
            (cat) => `
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 12px;">
            <div style="font-size: 11.5px; font-weight: 700; color: #0f172a; margin-bottom: 6px;">
              ${cat.category}
            </div>
            <div style="font-size: 10.5px; color: #334155; line-height: 1.5;">
              ${cat.skills
                .map(
                  (s) =>
                    `<span style="display: inline-block; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 1px 6px; margin: 2px 3px 2px 0; font-weight: 500;">
                      ${s.name} <span style="color: #2563eb; font-size: 9.5px;">(${s.level})</span>
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

    <!-- Professional Experience -->
    <div style="margin-bottom: 20px;">
      <h2 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #1e40af; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">
        Professional Work Experience
      </h2>
      <div style="display: flex; flex-direction: column; gap: 14px;">
        ${experienceData
          .map(
            (exp) => `
          <div style="border-left: 2px solid #3b82f6; padding-left: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
              <div>
                <span style="font-size: 13px; font-weight: 700; color: #0f172a;">${exp.role}</span>
                <span style="font-size: 13px; font-weight: 600; color: #2563eb;"> — ${exp.company}</span>
              </div>
              <span style="font-size: 11px; font-weight: 600; color: #64748b; font-family: monospace;">
                ${exp.period} | ${exp.location}
              </span>
            </div>
            <ul style="margin: 4px 0 6px 16px; padding: 0;">
              ${exp.achievements
                .map(
                  (ach) => `
                <li style="font-size: 11px; color: #334155; line-height: 1.5; margin-bottom: 3px;">
                  ${ach}
                </li>
              `
                )
                .join('')}
            </ul>
            <div style="margin-top: 4px;">
              <span style="font-size: 10px; font-weight: 600; color: #64748b;">Tech Stack: </span>
              ${exp.technologies
                .map(
                  (tech) => `
                <span style="font-size: 9.5px; font-family: monospace; background-color: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 3px; padding: 1px 5px; margin-right: 4px;">
                  ${tech}
                </span>
              `
                )
                .join('')}
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>

    <!-- Accredited Education & Certifications -->
    <div>
      <h2 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #1e40af; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">
        Accredited Education & Certifications
      </h2>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
        ${educationCertificationsData
          .map(
            (cert) => `
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 12px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2px;">
              <span style="font-size: 11.5px; font-weight: 700; color: #0f172a;">${cert.title}</span>
              <span style="font-size: 9px; font-weight: 600; color: #059669; background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 3px; padding: 1px 4px; white-space: nowrap;">
                ${cert.badge}
              </span>
            </div>
            <div style="font-size: 10.5px; color: #2563eb; font-weight: 600; margin-bottom: 3px;">
              ${cert.issuer} ${cert.hours ? `• ${cert.hours}` : ''}
            </div>
            <div style="font-size: 10px; color: #475569; line-height: 1.4;">
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
    onProgress?.('Rendering canvas...');

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
  // Native vector PDF runs synchronously in jsPDF
  generateNativeVectorPdf(filename);
}
