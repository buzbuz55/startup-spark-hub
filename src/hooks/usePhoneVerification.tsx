import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const usePhoneVerification = (initialPhoneNumber: string) => {
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOTP] = useState("");
  const [verificationInProgress, setVerificationInProgress] = useState(false);

  const sendOTP = async () => {
    try {
      setVerificationInProgress(true);
      const { error } = await supabase.auth.signInWithOtp({
        phone: phoneNumber,
      });
      
      if (error) throw error;
      
      setShowOTPInput(true);
      toast.success("OTP sent to your phone number");
      return true;
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
      return false;
    } finally {
      setVerificationInProgress(false);
    }
  };

  const verifyOTP = async () => {
    try {
      setVerificationInProgress(true);
      const { error } = await supabase.auth.verifyOtp({
        phone: phoneNumber,
        token: otp,
        type: 'sms',
      });

      if (error) throw error;

      setShowOTPInput(false);
      toast.success("Phone number verified successfully");
      return true;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP. Please try again.");
      return false;
    } finally {
      setVerificationInProgress(false);
    }
  };

  return {
    phoneNumber,
    setPhoneNumber,
    showOTPInput,
    setShowOTPInput,
    otp,
    setOTP,
    verificationInProgress,
    sendOTP,
    verifyOTP,
  };
};