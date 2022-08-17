import moment from 'moment';

export type Terms = '1A' | '1B' | '2A' | '2B' | '3A' | '3B' | '4A' | '4B' | 'GRADUATED';

export function toCurrentTerm(gradYear: number | null): Terms {
  if (!gradYear) {
    return '1A';
  }
  const currentYear = moment().year();
  const currentMonth = moment().month() + 1;
  const diff = gradYear - currentYear;

  if (diff === 0) {
    if (currentMonth >= 6) {
      return 'GRADUATED';
    }
    return '4B';
  }
  if (diff === 1) {
    if (currentMonth >= 8) {
      return '4A';
    }
    return '3B';
  }
  if (diff === 2) {
    if (currentMonth >= 5) {
      return '3A';
    }
    return '2B';
  }
  if (diff === 3) {
    if (currentMonth >= 8) {
      return '2B';
    }
    return '2A';
  }
  if (diff === 4) {
    if (currentMonth >= 5) {
      return '1B';
    }
    return '1A';
  }
  return '1A';
}

export function canUserCritiqueResumes(term: Terms): boolean {
  if (term === '1A' || term === '1B' || term === '2A') {
    return false;
  }
  return true;
}
