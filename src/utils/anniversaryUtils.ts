/**
 * Anniversary & Relationship Statistics Utilities
 * Calculate days together, upcoming anniversaries, and relationship milestones
 */

export interface AnniversaryStats {
  totalDays: number;
  months: number;
  years: number;
  formattedTime: string;
  nextMilestone: string;
  milestoneDays: number;
}

/**
 * Calculate days and time since relationship started
 * @param startDate - Date relationship started (stored in localStorage)
 * @returns Anniversary statistics object
 */
export const calculateAnniversary = (startDate: string): AnniversaryStats => {
  const start = new Date(startDate);
  const today = new Date();
  
  // Calculate total days
  const totalDays = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  
  // Calculate years and months
  const years = Math.floor(totalDays / 365.25);
  const remainingDaysAfterYears = totalDays - Math.floor(years * 365.25);
  const months = Math.floor(remainingDaysAfterYears / 30.44);
  
  // Format time string
  let formattedTime = '';
  if (years > 0) formattedTime += `${years} year${years > 1 ? 's' : ''} `;
  if (months > 0) formattedTime += `${months} month${months > 1 ? 's' : ''}`;
  if (!formattedTime) formattedTime = `${totalDays} days`;
  
  // Calculate next milestone
  const nextYear = Math.ceil(totalDays / 365.25);
  const milestoneDays = Math.ceil(nextYear * 365.25) - totalDays;
  const milestoneType = nextYear === 1 ? '1st Anniversary' : `${nextYear} Year Anniversary`;
  
  return {
    totalDays,
    months,
    years,
    formattedTime: formattedTime.trim(),
    nextMilestone: milestoneType,
    milestoneDays
  };
};

/**
 * Get or set relationship start date
 * Stored in localStorage as 'relationshipStartDate'
 */
export const getStartDate = (): string | null => {
  return localStorage.getItem('relationshipStartDate');
};

export const setStartDate = (date: string): void => {
  localStorage.setItem('relationshipStartDate', date);
};

/**
 * Check if start date has been set
 */
export const hasStartDate = (): boolean => {
  return !!localStorage.getItem('relationshipStartDate');
};

/**
 * Calculate love stats for dashboard
 */
export interface LoveStats {
  daysTogethernumber;
  lettersCount: number;
  memoriesSaved: number;
  entriesWritten: number;
  annualAnniversary: boolean;
}

export const calculateLoveStats = (): LoveStats => {
  const startDate = getStartDate();
  const stats: AnniversaryStats = startDate ? calculateAnniversary(startDate) : {
    totalDays: 0,
    months: 0,
    years: 0,
    formattedTime: 'Start your journey',
    nextMilestone: 'Set your date!',
    milestoneDays: 0
  };
  
  // Get other stats from localStorage
  const lettersCount = localStorage.getItem('herCornerEntries')
    ? JSON.parse(localStorage.getItem('herCornerEntries') || '[]').length
    : 0;
  
  // Check if today is anniversary
  const today = new Date();
  const isAnniversary = startDate
    ? new Date(startDate).getMonth() === today.getMonth() &&
      new Date(startDate).getDate() === today.getDate()
    : false;
  
  return {
    daysTogethernumber: stats.totalDays,
    lettersCount,
    memoriesSaved: 0, // Will be filled from Favorites
    entriesWritten: lettersCount,
    annualAnniversary: isAnniversary
  };
};

export default calculateAnniversary;
