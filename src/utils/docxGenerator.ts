import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  convertInchesToTwip,
} from 'docx';
import {
  developerConfig,
  experienceData,
  skillCategories,
  educationCertificationsData,
  resumeSummary,
  featuredToolsData,
} from '../data/portfolioData';

/**
 * Generates an ATS and LinkedIn-optimized Microsoft Word (.docx) resume.
 * Uses native heading levels, bullet points, and clean typography that LinkedIn's
 * resume parser can extract seamlessly.
 */
export async function generateResumeDocx(filename = 'Shaheera_Sadia_Resume.docx'): Promise<void> {
  const doc = new Document({
    creator: developerConfig.name,
    title: `${developerConfig.name} - Resume`,
    description: 'Curriculum Vitae / Professional Resume',
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.6),
              bottom: convertInchesToTwip(0.6),
              left: convertInchesToTwip(0.65),
              right: convertInchesToTwip(0.65),
            },
          },
        },
        children: [
          // Name & Title Header
          new Paragraph({
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: developerConfig.name.toUpperCase(),
                bold: true,
                size: 32, // 16pt
                color: '1E293B',
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: `${developerConfig.role} | Web Applications Since 2021`,
                bold: true,
                size: 22, // 11pt
                color: '2563EB',
              }),
            ],
          }),

          // Contact Details
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            border: {
              bottom: {
                color: 'CBD5E1',
                space: 6,
                style: BorderStyle.SINGLE,
                size: 8,
              },
            },
            children: [
              new TextRun({
                text: `Email: ${developerConfig.email}   |   Location: ${developerConfig.location}   |   Portfolio: shaheera-sadia.vercel.app\nGitHub: github.com/shaheerasadia   |   LinkedIn: ${developerConfig.linkedin.replace('https://', '').replace(/^www\./, '').replace(/\/$/, '')}`,
                size: 18, // 9pt
                color: '475569',
              }),
            ],
          }),

          // Professional Summary Section
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: 'PROFESSIONAL SUMMARY',
                bold: true,
                size: 24, // 12pt
                color: '1E40AF',
              }),
            ],
          }),

          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: resumeSummary.summary,
                size: 20, // 10pt
                color: '334155',
              }),
            ],
          }),

          // Experience Section (Targeted by LinkedIn Parser)
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 120 },
            border: {
              bottom: {
                color: 'E2E8F0',
                space: 4,
                style: BorderStyle.SINGLE,
                size: 6,
              },
            },
            children: [
              new TextRun({
                text: 'EXPERIENCE',
                bold: true,
                size: 24, // 12pt
                color: '1E40AF',
              }),
            ],
          }),

          ...experienceData.flatMap((exp) => [
            new Paragraph({
              spacing: { before: 140, after: 40 },
              children: [
                new TextRun({
                  text: exp.role,
                  bold: true,
                  size: 22, // 11pt
                  color: '0F172A',
                }),
                new TextRun({
                  text: ` — ${exp.company}`,
                  bold: true,
                  size: 22,
                  color: '2563EB',
                }),
                new TextRun({
                  text: `   (${exp.period} | ${exp.location})`,
                  italics: true,
                  size: 18,
                  color: '64748B',
                }),
              ],
            }),
            ...exp.achievements.map(
              (ach) =>
                new Paragraph({
                  bullet: { level: 0 },
                  spacing: { after: 40 },
                  children: [
                    new TextRun({
                      text: ach,
                      size: 19, // 9.5pt
                      color: '334155',
                    }),
                  ],
                })
            ),
            new Paragraph({
              spacing: { after: 120 },
              children: [
                new TextRun({
                  text: 'Technologies: ',
                  bold: true,
                  size: 18,
                  color: '64748B',
                }),
                new TextRun({
                  text: exp.technologies.join(', '),
                  size: 18,
                  color: '475569',
                }),
              ],
            }),
          ]),

          // Key Featured Production Projects Section
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 240, after: 120 },
            border: {
              bottom: {
                color: 'E2E8F0',
                space: 4,
                style: BorderStyle.SINGLE,
                size: 6,
              },
            },
            children: [
              new TextRun({
                text: 'KEY FEATURED PRODUCTION PROJECTS',
                bold: true,
                size: 24,
                color: '1E40AF',
              }),
            ],
          }),

          ...featuredToolsData.flatMap((tool) => [
            new Paragraph({
              spacing: { before: 100, after: 40 },
              children: [
                new TextRun({
                  text: `${tool.application} `,
                  bold: true,
                  size: 20,
                  color: '0F172A',
                }),
                new TextRun({
                  text: `(${tool.keyTech})`,
                  bold: true,
                  size: 18,
                  color: '2563EB',
                }),
              ],
            }),
            new Paragraph({
              spacing: { after: 40 },
              children: [
                new TextRun({
                  text: tool.description,
                  size: 18,
                  color: '334155',
                }),
              ],
            }),
            new Paragraph({
              spacing: { after: 100 },
              children: [
                new TextRun({
                  text: `Live: ${tool.liveUrl}  |  GitHub: ${tool.githubUrl}`,
                  size: 17,
                  color: '64748B',
                }),
              ],
            }),
          ]),

          // Education & Certifications Section
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 120 },
            border: {
              bottom: {
                color: 'E2E8F0',
                space: 4,
                style: BorderStyle.SINGLE,
                size: 6,
              },
            },
            children: [
              new TextRun({
                text: 'EDUCATION & CERTIFICATIONS',
                bold: true,
                size: 24,
                color: '1E40AF',
              }),
            ],
          }),

          ...educationCertificationsData.flatMap((cert) => [
            new Paragraph({
              spacing: { before: 120, after: 40 },
              children: [
                new TextRun({
                  text: cert.title,
                  bold: true,
                  size: 21,
                  color: '0F172A',
                }),
                new TextRun({
                  text: ` — ${cert.issuer}`,
                  bold: true,
                  size: 21,
                  color: '2563EB',
                }),
                new TextRun({
                  text: cert.issuedDate ? ` (${cert.issuedDate})` : '',
                  italics: true,
                  size: 18,
                  color: '64748B',
                }),
              ],
            }),
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({
                  text: cert.description,
                  size: 19,
                  color: '475569',
                }),
              ],
            }),
          ]),

          // Skills Section
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 120 },
            border: {
              bottom: {
                color: 'E2E8F0',
                space: 4,
                style: BorderStyle.SINGLE,
                size: 6,
              },
            },
            children: [
              new TextRun({
                text: 'SKILLS & TECHNICAL PROFICIENCIES',
                bold: true,
                size: 24,
                color: '1E40AF',
              }),
            ],
          }),

          ...skillCategories.map(
            (cat) =>
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({
                    text: `${cat.category}: `,
                    bold: true,
                    size: 20,
                    color: '1E293B',
                  }),
                  new TextRun({
                    text: cat.skills.map((s) => `${s.name} (${s.level})`).join(', '),
                    size: 19,
                    color: '334155',
                  }),
                ],
              })
          ),

          // Core Principles
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: 'CORE ARCHITECTURAL PRINCIPLES',
                bold: true,
                size: 22,
                color: '1E40AF',
              }),
            ],
          }),

          ...developerConfig.principles.map(
            (principle) =>
              new Paragraph({
                bullet: { level: 0 },
                spacing: { after: 40 },
                children: [
                  new TextRun({
                    text: principle,
                    size: 19,
                    color: '334155',
                  }),
                ],
              })
          ),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
