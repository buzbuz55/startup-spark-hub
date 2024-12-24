import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface PhoneVerificationProps {
  phoneNumber: string;
  onPhoneChange: (phone: string) => void;
  showOTPInput: boolean;
  otp: string;
  onOTPChange: (otp: string) => void;
  verificationInProgress: boolean;
  onVerifyOTP: () => void;
  disabled?: boolean;
}

const PhoneVerification = ({
  phoneNumber,
  onPhoneChange,
  showOTPInput,
  otp,
  onOTPChange,
  verificationInProgress,
  onVerifyOTP,
  disabled,
}: PhoneVerificationProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="phone">Phone Number</Label>
      <Input
        id="phone"
        name="phone"
        type="tel"
        value={phoneNumber}
        onChange={(e) => onPhoneChange(e.target.value)}
        placeholder="Enter your phone number"
        disabled={showOTPInput || verificationInProgress || disabled}
      />

      {showOTPInput && (
        <div className="space-y-2">
          <Label>Enter OTP</Label>
          <div className="flex flex-col space-y-2">
            <InputOTP
              value={otp}
              onChange={onOTPChange}
              maxLength={6}
              render={({ slots }) => (
                <InputOTPGroup className="gap-2">
                  {slots.map((slot, index) => (
                    <InputOTPSlot key={index} {...slot} index={index} />
                  ))}
                </InputOTPGroup>
              )}
            />
            <Button
              type="button"
              onClick={onVerifyOTP}
              disabled={otp.length !== 6 || verificationInProgress}
            >
              {verificationInProgress ? "Verifying..." : "Verify OTP"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneVerification;