'use client';

import { useState } from 'react';
import { Award, ChevronLeft, ChevronRight } from 'lucide-react';

export type Certification = {
  _id: string;
  name: string;
  issuer: string;
  dateLabel: string;
  credentialLink?: string;
  credentialId?: string;
};

export default function CertificationsGrid({
  certifications,
}: {
  certifications: Certification[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(certifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCertifications = certifications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const certSection = document.getElementById('certifications-grid');
    if (certSection) {
      certSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <>
      <div
        id='certifications-grid'
        className='grid grid-cols-1 md:grid-cols-2 gap-4'
      >
        {currentCertifications.map((cert) => (
          <div
            key={cert._id}
            className='group p-6 rounded-xl border border-border bg-card/20 hover:bg-card/40 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between h-full'
          >
            <div>
              <div className='flex items-start justify-between mb-4'>
                <div className='p-2 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300'>
                  <Award className='w-5 h-5 text-primary' />
                </div>
                <span className='font-mono text-[10px] text-muted-foreground bg-background px-2 py-1 rounded-full border border-border'>
                  {cert.dateLabel}
                </span>
              </div>

              <h3 className='text-base font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors'>
                {cert.name}
              </h3>
              <div className='text-sm text-muted-foreground'>
                {cert.issuer}
              </div>
              {cert.credentialId && (
                <div className='text-xs text-muted-foreground/70 mt-1 font-mono'>
                  ID: {cert.credentialId}
                </div>
              )}
            </div>

            {cert.credentialLink && (
              <div className='mt-4 pt-4 border-t border-border/50'>
                <a
                  href={cert.credentialLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-xs font-medium text-primary hover:underline inline-flex items-center gap-1'
                >
                  Show Credential
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className='flex justify-center items-center gap-4 mt-8'>
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className='p-2 rounded-lg border border-border bg-card/20 hover:bg-card/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            aria-label='Previous page'
          >
            <ChevronLeft className='w-5 h-5' />
          </button>
          <span className='text-sm font-mono text-muted-foreground'>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className='p-2 rounded-lg border border-border bg-card/20 hover:bg-card/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            aria-label='Next page'
          >
            <ChevronRight className='w-5 h-5' />
          </button>
        </div>
      )}
    </>
  );
}
