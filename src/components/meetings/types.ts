export interface MeetingFormData {
  guestEmail: string;
  selectedDate: Date | undefined;
  selectedTime: string;
}

export interface TimeSlot {
  time: string;
  disabled: boolean;
}