import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import React from "react"
export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
}




const InputFile = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, ...props }, ref) => {
        return (
            <div className={cn("grid w-full max-w-sm items-center gap-1.5", className)}>
                <Label htmlFor="picture">{label}</Label>
                <Input id="picture" type="file" ref={ref} {...props} />
            </div>
        )
    }
)
Input.displayName = "Input"

export { InputFile }