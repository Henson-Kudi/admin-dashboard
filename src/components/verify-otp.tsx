"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { verifyOtp } from "@/app/actions"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const {toast} = useToast()

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    const otpValue = otp.join("")
    if (otpValue.length !== 6) {
        toast({
          title: "Invalid OTP",
          description: "Please enter a valid 6-digit OTP",
          className: 'text-red-500'
        })
      setSuccess(false)
    //   setError("Please enter a valid 6-digit OTP")
      return
    }

    try {
        console.log(otpValue, 'otp code')
        console.log('calling api')
      const valid = await verifyOtp({code: otpValue})
      
      if (valid.success) {
        setSuccess(true)
        setError("")
        router.replace('/')
      }else{
        toast({
          title: "Invalid OTP",
          description: "The OTP you entered is invalid. Please try again.",
          className: 'text-red-500'
        })
        setSuccess(false)
      }
    } catch (err) {
        toast({
          title: "Invalid OTP",
          description: "An error occurred. Please try again.",
          className: 'text-red-500'
        })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="w-max p-8 space-y-6  rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center">Verify OTP</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="otp-input" className="sr-only">
              Enter your OTP
            </Label>
            <div className="flex justify-between mt-2">
              {otp.map((data, index) => (
                <Input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="\d{1}"
                  maxLength={1}
                  className="w-12 h-12 text-center text-xl font-semibold m-1"
                  value={data}
                  onChange={e => handleChange(e.target, index)}
                  onFocus={e => e.target.select()}
                />
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full">
            Verify OTP
          </Button>
        </form>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert variant="default" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>OTP verified successfully!</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}