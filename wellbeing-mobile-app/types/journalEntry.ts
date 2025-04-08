interface JournalEntry {
  date: string; // Assuming date is a string in "YYYY-MM-DD" format
  water_intake: number;
  sleep: {
    hours: number;
    quality: number; // e.g., 1-5, 1 being poor, 5 being excellent
    bed_time: string; // ISO 8601 date-time string
  };
  diet: {
    sugar_intake: number; // e.g., 1-5, 1 being low, 5 being very high
    caffine_consumption: number;
    diet: string;
  };
  exercise: {
    duration: number;
    intensity: number; // e.g., 1-3, 1 being light, 2 being moderate, 3 being intense
    type: string;
  };
  mood: {
    mood: string[];
    level: number;
  };
  daily_spending: number;
  journal: string;
  gratitude: string[];
  read: boolean;
  socialize: boolean;
  meditate: boolean;
}

interface JournalEntries {
  journalEntries: JournalEntry[];
}
