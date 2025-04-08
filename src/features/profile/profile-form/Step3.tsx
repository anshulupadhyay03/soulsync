import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useProfileStore } from "../data/profileStore";

// Define the schema for Step 3
const formSchema = z.object({
  mobileNumber: z
    .string()
    .regex(/^\+91\d{10}$/, { message: "Please enter a valid mobile number starting with +91." }),
  highestQualification: z.string().nonempty({ message: "Please select your highest qualification." }),
  collegeName: z.string().optional(),
  workSector: z.string().nonempty({ message: "Please select your work sector." }),
  jobRole: z.string().nonempty({ message: "Please select your job role." }),
  companyName: z.string().optional(),
  incomeType: z.enum(["Yearly", "Monthly"]),
  yearlyIncome: z.string().optional(),
  monthlyIncome: z.string().optional(),
});

export function Step3() {
  const { profileData, setProfileData, prevStep, saveToFirebase } = useProfileStore();

  // Initialize the form with default values from the store
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobileNumber: profileData.mobileNumber || "+91",
      highestQualification: profileData.highestQualification || "",
      collegeName: profileData.collegeName || "",
      workSector: profileData.workSector || "",
      jobRole: profileData.jobRole || "",
      companyName: profileData.companyName || "",
      incomeType: profileData.incomeType || "Yearly",
      yearlyIncome: profileData.yearlyIncome || "",
      monthlyIncome: profileData.monthlyIncome || "",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setProfileData(values);
    await saveToFirebase();
    // Optionally redirect to dashboard after saving
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md space-y-6">
        <h2 className="text-2xl font-bold mb-4">Just a few questions about your education & career</h2>

        {/* Mobile Number */}
        <FormField
          control={form.control}
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your mobile no. *</FormLabel>
              <FormControl>
                <Input placeholder="Enter mobile no." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Highest Qualification */}
        <FormField
          control={form.control}
          name="highestQualification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your highest qualification *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select qualification" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="B.E / B.Tech">B.E / B.Tech</SelectItem>
                  <SelectItem value="M.E / M.Tech">M.E / M.Tech</SelectItem>
                  <SelectItem value="MBA">MBA</SelectItem>
                  <SelectItem value="B.Sc">B.Sc</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* College Name */}
        <FormField
          control={form.control}
          name="collegeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your college name (Highest degree)</FormLabel>
              <FormControl>
                <Input placeholder="Enter college name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Work Sector */}
        <FormField
          control={form.control}
          name="workSector"
          render={({ field }) => (
            <FormItem>
              <FormLabel>You work with</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select work sector" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Private Company">Private Company</SelectItem>
                  <SelectItem value="Government">Government</SelectItem>
                  <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Job Role */}
        <FormField
          control={form.control}
          name="jobRole"
          render={({ field }) => (
            <FormItem>
              <FormLabel>As</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Software Developer / Programmer">
                    Software Developer / Programmer
                  </SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Engineer">Engineer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company Name */}
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your company name (current)</FormLabel>
              <FormControl>
                <Input placeholder="Enter company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Income Type Toggle */}
        <FormField
          control={form.control}
          name="incomeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your income *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="Yearly" />
                    </FormControl>
                    <FormLabel className="font-normal">Yearly</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="Monthly" />
                    </FormControl>
                    <FormLabel className="font-normal">Monthly</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Yearly Income */}
        {form.watch("incomeType") === "Yearly" && (
          <FormField
            control={form.control}
            name="yearlyIncome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select yearly income</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select yearly income" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="₹ 10 to 15 Lakh yearly">₹ 10 to 15 Lakh yearly</SelectItem>
                    <SelectItem value="₹ 15 to 20 Lakh yearly">₹ 15 to 20 Lakh yearly</SelectItem>
                    <SelectItem value="₹ 20 to 25 Lakh yearly">₹ 20 to 25 Lakh yearly</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Monthly Income */}
        {form.watch("incomeType") === "Monthly" && (
          <FormField
            control={form.control}
            name="monthlyIncome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select monthly income</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select monthly income" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="₹ 80K to 1.25 Lakh monthly">
                      ₹ 80K to 1.25 Lakh monthly
                    </SelectItem>
                    <SelectItem value="₹ 1.25 to 2 Lakh monthly">
                      ₹ 1.25 to 2 Lakh monthly
                    </SelectItem>
                    <SelectItem value="₹ 2 to 3 Lakh monthly">₹ 2 to 3 Lakh monthly</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Income Note */}
        <p className="text-sm text-gray-500">
          Income details will help us find you relevant Matches. You may choose NOT to show this to
          others.
        </p>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600">
            Create Profile
          </Button>
        </div>
      </form>
    </Form>
  );
}