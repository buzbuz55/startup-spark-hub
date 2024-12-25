import { createContext, useContext, useState } from "react";
import { MeetingFormData } from "./types";

interface MeetingFormContextType {
  formData: MeetingFormData;
  setFormData: (data: MeetingFormData) => void;
}

const MeetingFormContext = createContext<MeetingFormContextType | undefined>(undefined);

export function MeetingFormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<MeetingFormData>({
    guestEmail: "",
    subject: "",
    selectedDate: undefined,
    selectedTime: "09:00 AM",
  });

  return (
    <MeetingFormContext.Provider value={{ formData, setFormData }}>
      {children}
    </MeetingFormContext.Provider>
  );
}

export function useMeetingForm() {
  const context = useContext(MeetingFormContext);
  if (context === undefined) {
    throw new Error("useMeetingForm must be used within a MeetingFormProvider");
  }
  return context;
}