export interface MeetingFormData {
  guestEmail: string;
  subject: string;
  selectedDate: Date | undefined;
  selectedTime: string;
}

export interface TimeSlot {
  time: string;
  disabled: boolean;
}