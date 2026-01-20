interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  quizProgress?: number
  quizTotal?: number
}

export default function ProgressBar({ currentStep, totalSteps, quizProgress = 0, quizTotal = 0 }: ProgressBarProps) {
  const mainProgress = ((currentStep - 1) / (totalSteps - 1)) * 100

  if (currentStep === 2) {
    const quizProgressPercent = quizTotal > 0 ? (quizProgress / quizTotal) * 100 : 0

    return (
      <div className="flex gap-2">
        {[1, 2, 3].map((step) => {
          let fillPercent = 0
          if (step < currentStep) {
            fillPercent = 100
          } else if (step === currentStep) {
            fillPercent = quizProgressPercent
          }

          return (
            <div
              key={step}
              className="flex-1 h-1.5 rounded-full overflow-hidden bg-gray-200 transition-all duration-300"
            >
              <div
                className="h-full bg-[#0065F4] rounded-full transition-all duration-300"
                style={{ width: `${fillPercent}%` }}
              />
            </div>
          )
        })}
      </div>
    )
  }

  // Regular 3-step progress bar
  return (
    <div className="flex gap-2">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className="flex-1 h-1.5 rounded-full transition-all duration-300"
          style={{
            backgroundColor: step < currentStep ? "#0065F4" : step === currentStep ? "#0065F4" : "#e2e8f0",
          }}
        />
      ))}
    </div>
  )
}
