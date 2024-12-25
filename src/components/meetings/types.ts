export interface MeetingFormData {
  guestEmail: string;
  subject: string;
  selectedDate: Date | undefined;
  selectedTime: string;
  attachedFile?: File | null;
  message?: string;
}

export interface TimeSlot {
  time: string;
  disabled: boolean;
}