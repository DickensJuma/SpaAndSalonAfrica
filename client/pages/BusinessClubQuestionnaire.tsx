import { useState } from "react";
import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronLeft, Check, Loader2 } from "lucide-react";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  businessName: string;
  businessType: string;
  businessLocation: string;
  yearsInBusiness: string;
  numberOfEmployees: string;
  businessRealities: string[];
  expectations: string;
  focusAreas: string[];
  howDidYouHear: string;
}

export default function BusinessClubQuestionnaire() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    businessName: "",
    businessType: "",
    businessLocation: "",
    yearsInBusiness: "",
    numberOfEmployees: "",
    businessRealities: [],
    expectations: "",
    focusAreas: [],
    howDidYouHear: "",
  });

  const businessTypeOptions = [
    "Spa",
    "Hair and Beauty Salon",
    "Barbershop",
    "Salon & Spa",
    "Barbershop & Salon",
    "Nail Salon",
  ];

  const yearsInBusinessOptions = [
    "Less than 1 year",
    "1 – 3 years",
    "3 – 5 years",
    "Over 5 years",
  ];

  const numberOfEmployeesOptions = [
    "1 (Just me)",
    "2 – 3",
    "4 – 6",
    "7 – 10",
    "10+",
  ];

  const businessRealitiesOptions = [
    "I'm busy but profits are zero to none",
    "I struggle with pricing",
    "Cash flow is inconsistent",
    "Staff management is a challenge",
    "I want to grow but don't know how",
    "I feel overwhelmed running the business",
    "Things are going well, but I want to scale",
  ];

  const focusAreasOptions = [
    "Pricing & profitability",
    "Financial management & taxes",
    "Staff management & retention",
    "Marketing & customer retention",
    "Business systems & structure",
    "Scaling & opening more branches",
    "Personal growth as a business owner",
  ];

  const howDidYouHearOptions = [
    "Instagram",
    "WhatsApp",
    "Referral from another owner",
    "Webinar / Event",
    "Other",
  ];

  const questions = [
    // Section 1: Contact Details
    {
      section: "Contact Details",
      sectionNumber: 1,
      question: "Full Name",
      type: "text",
      field: "fullName" as keyof FormData,
      required: true,
      placeholder: "Enter your full name",
    },
    {
      section: "Contact Details",
      sectionNumber: 1,
      question: "Phone Number (WhatsApp preferred)",
      subtitle: "Include country code",
      type: "text",
      field: "phone" as keyof FormData,
      required: true,
      placeholder: "+254 712 345 678",
    },
    {
      section: "Contact Details",
      sectionNumber: 1,
      question: "Email Address",
      type: "email",
      field: "email" as keyof FormData,
      required: true,
      placeholder: "you@example.com",
    },
    // Section 2: Business Details
    {
      section: "Business Details",
      sectionNumber: 2,
      question: "Business Name",
      type: "text",
      field: "businessName" as keyof FormData,
      required: true,
      placeholder: "Enter your business name",
    },
    {
      section: "Business Details",
      sectionNumber: 2,
      question: "Type of Business",
      type: "radio",
      field: "businessType" as keyof FormData,
      required: true,
      options: businessTypeOptions,
    },
    {
      section: "Business Details",
      sectionNumber: 2,
      question: "Business Location",
      subtitle: "City, Street, Building, Floor",
      type: "text",
      field: "businessLocation" as keyof FormData,
      required: true,
      placeholder: "e.g., Nairobi, Kimathi Street, ABC Building, 3rd Floor",
    },
    {
      section: "Business Details",
      sectionNumber: 2,
      question: "How long have you been in business?",
      type: "radio",
      field: "yearsInBusiness" as keyof FormData,
      required: true,
      options: yearsInBusinessOptions,
    },
    {
      section: "Business Details",
      sectionNumber: 2,
      question: "Number of Employees (including yourself)",
      type: "radio",
      field: "numberOfEmployees" as keyof FormData,
      required: true,
      options: numberOfEmployeesOptions,
    },
    // Section 3: Business Realities
    {
      section: "Business Realities",
      sectionNumber: 3,
      question: "What best describes your business right now?",
      subtitle: "Select all that apply",
      type: "checkbox",
      field: "businessRealities" as keyof FormData,
      required: true,
      options: businessRealitiesOptions,
    },
    // Section 4: Expectations & Goals
    {
      section: "Expectations & Goals",
      sectionNumber: 4,
      question:
        "What are you hoping to gain by joining the Spa & Salon Africa Business Club?",
      type: "textarea",
      field: "expectations" as keyof FormData,
      required: true,
      placeholder: "Share your goals and expectations...",
    },
    {
      section: "Expectations & Goals",
      sectionNumber: 4,
      question: "Which areas would you like the Business Club to focus on most?",
      subtitle: "Select all that apply",
      type: "checkbox",
      field: "focusAreas" as keyof FormData,
      required: true,
      options: focusAreasOptions,
    },
    // Section 5: Final Touch
    {
      section: "Final Touch",
      sectionNumber: 5,
      question: "How did you hear about Spa & Salon Africa?",
      type: "radio",
      field: "howDidYouHear" as keyof FormData,
      required: true,
      options: howDidYouHearOptions,
    },
  ];

  const totalSteps = questions.length;
  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleInputChange = (
    field: keyof FormData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (field: keyof FormData, option: string) => {
    const currentValues = formData[field] as string[];
    const newValues = currentValues.includes(option)
      ? currentValues.filter((item) => item !== option)
      : [...currentValues, option];
    handleInputChange(field, newValues);
  };

  const isCurrentStepValid = () => {
    const value = formData[currentQuestion.field];

    if (!currentQuestion.required) return true;

    if (currentQuestion.type === "checkbox") {
      return Array.isArray(value) && value.length > 0;
    }

    return typeof value === "string" && value.trim() !== "";
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/business-club/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: "success",
          message:
            "Thank you for your application! We'll review your information and get back to you shortly.",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to submit. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (currentQuestion.type !== "textarea") {
        e.preventDefault();
        if (isCurrentStepValid()) {
          if (currentStep < totalSteps - 1) {
            handleNext();
          } else {
            handleSubmit();
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className={cn(
              "font-display text-4xl md:text-5xl font-bold mb-6",
              "text-foreground"
            )}
          >
            Join the Spa & Salon Africa Business Club
          </h1>
          <p
            className={cn(
              "text-foreground/70 text-lg md:text-xl",
              "font-light max-w-2xl mx-auto"
            )}
          >
            A community for spa, salon, and barbershop owners who want to run
            profitable, well-structured businesses.
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-foreground/60 font-light">
              Question {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-sm text-foreground/60 font-light">
              {Math.round(progress)}% complete
            </span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {submitStatus.type === "success" ? (
            // Success State
            <div className="text-center py-12">
              <div
                className={cn(
                  "w-20 h-20 mx-auto mb-6 rounded-full",
                  "bg-black/10 flex items-center justify-center"
                )}
              >
                <Check className="w-10 h-10 text-black" />
              </div>
              <h2
                className={cn(
                  "font-display text-3xl md:text-4xl font-bold mb-4",
                  "text-foreground"
                )}
              >
                Application Submitted!
              </h2>
              <p className="text-foreground/70 text-lg font-light max-w-xl mx-auto">
                {submitStatus.message}
              </p>
            </div>
          ) : (
            // Question Form
            <div className="space-y-8">
              {/* Section Header */}
              <div className="border-b border-border pb-4">
                <div className="text-sm text-foreground/50 font-light mb-2">
                  Section {currentQuestion.sectionNumber}:{" "}
                  {currentQuestion.section}
                </div>
                <h2
                  className={cn(
                    "font-display text-2xl md:text-3xl font-bold",
                    "text-foreground"
                  )}
                >
                  {currentQuestion.question}
                  {currentQuestion.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </h2>
                {currentQuestion.subtitle && (
                  <p className="text-foreground/60 text-sm mt-2 font-light">
                    {currentQuestion.subtitle}
                  </p>
                )}
              </div>

              {/* Input Fields */}
              <div className="min-h-[200px]">
                {/* Text Input */}
                {currentQuestion.type === "text" && (
                  <input
                    type="text"
                    value={formData[currentQuestion.field] as string}
                    onChange={(e) =>
                      handleInputChange(currentQuestion.field, e.target.value)
                    }
                    onKeyPress={handleKeyPress}
                    placeholder={currentQuestion.placeholder}
                    className={cn(
                      "w-full px-4 py-3 text-lg rounded-sm",
                      "bg-secondary border-2 border-border",
                      "text-foreground placeholder:text-foreground/50",
                      "focus:outline-none focus:ring-2 focus:ring-black focus:border-black",
                      "transition-all duration-200"
                    )}
                    autoFocus
                  />
                )}

                {/* Email Input */}
                {currentQuestion.type === "email" && (
                  <input
                    type="email"
                    value={formData[currentQuestion.field] as string}
                    onChange={(e) =>
                      handleInputChange(currentQuestion.field, e.target.value)
                    }
                    onKeyPress={handleKeyPress}
                    placeholder={currentQuestion.placeholder}
                    className={cn(
                      "w-full px-4 py-3 text-lg rounded-sm",
                      "bg-secondary border-2 border-border",
                      "text-foreground placeholder:text-foreground/50",
                      "focus:outline-none focus:ring-2 focus:ring-black focus:border-black",
                      "transition-all duration-200"
                    )}
                    autoFocus
                  />
                )}

                {/* Textarea */}
                {currentQuestion.type === "textarea" && (
                  <textarea
                    value={formData[currentQuestion.field] as string}
                    onChange={(e) =>
                      handleInputChange(currentQuestion.field, e.target.value)
                    }
                    placeholder={currentQuestion.placeholder}
                    rows={6}
                    className={cn(
                      "w-full px-4 py-3 text-lg rounded-sm resize-none",
                      "bg-secondary border-2 border-border",
                      "text-foreground placeholder:text-foreground/50",
                      "focus:outline-none focus:ring-2 focus:ring-black focus:border-black",
                      "transition-all duration-200"
                    )}
                    autoFocus
                  />
                )}

                {/* Radio Options */}
                {currentQuestion.type === "radio" && (
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option) => (
                      <label
                        key={option}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-sm cursor-pointer",
                          "border-2 transition-all duration-200",
                          formData[currentQuestion.field] === option
                            ? "bg-black/5 border-black"
                            : "bg-secondary border-border hover:border-black/30"
                        )}
                      >
                        <input
                          type="radio"
                          name={currentQuestion.field}
                          value={option}
                          checked={formData[currentQuestion.field] === option}
                          onChange={(e) =>
                            handleInputChange(
                              currentQuestion.field,
                              e.target.value
                            )
                          }
                          className="w-5 h-5 text-black focus:ring-black"
                        />
                        <span className="text-foreground font-light">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Checkbox Options */}
                {currentQuestion.type === "checkbox" && (
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option) => {
                      const isChecked = (
                        formData[currentQuestion.field] as string[]
                      ).includes(option);
                      return (
                        <label
                          key={option}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-sm cursor-pointer",
                            "border-2 transition-all duration-200",
                            isChecked
                              ? "bg-black/5 border-black"
                              : "bg-secondary border-border hover:border-black/30"
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() =>
                              handleCheckboxChange(
                                currentQuestion.field,
                                option
                              )
                            }
                            className="w-5 h-5 text-black focus:ring-black rounded"
                          />
                          <span className="text-foreground font-light">
                            {option}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Error Message */}
              {submitStatus.type === "error" && (
                <div
                  className={cn(
                    "p-4 rounded-sm text-sm",
                    "bg-red-50 text-red-700 border border-red-200"
                  )}
                >
                  {submitStatus.message}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={cn(
                    "px-6 py-3 rounded-sm font-semibold",
                    "bg-secondary text-foreground border-2 border-border",
                    "hover:bg-secondary/80 transition-colors duration-200",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "flex items-center gap-2"
                  )}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>

                {currentStep < totalSteps - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isCurrentStepValid()}
                    className={cn(
                      "flex-1 px-6 py-3 rounded-sm font-semibold",
                      "bg-black text-white hover:bg-black/90",
                      "transition-all duration-200",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "flex items-center justify-center gap-2"
                    )}
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isCurrentStepValid() || isSubmitting}
                    className={cn(
                      "flex-1 px-6 py-3 rounded-sm font-semibold",
                      "bg-black text-white hover:bg-black/90",
                      "transition-all duration-200",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "flex items-center justify-center gap-2"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <Check className="w-5 h-5" />
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Hint Text */}
              <p className="text-sm text-foreground/50 text-center font-light">
                Press <kbd className="px-2 py-1 bg-secondary rounded text-xs">Enter</kbd> to continue
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer
        className={cn(
          "border-t border-border bg-background",
          "py-12 px-4 sm:px-6 lg:px-8"
        )}
      >
        <div className="max-w-7xl mx-auto text-center text-sm text-foreground/50">
          <p>&copy; 2026 Spa & Salon Africa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}