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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useProfileStore } from "../data/profileStore";

// Define the schema for Step 2
const formSchema = z.object({
  city: z.string().nonempty({ message: "Please select the city you live in." }),
  livesWithFamily: z.enum(["Yes", "No"], { message: "Please select if you live with your family." }),
  familyCity: z.string().optional(),
  maritalStatus: z.string().nonempty({ message: "Please select your marital status." }),
  diet: z.enum(["Veg", "Non-Veg", "Occasionally Non-Veg", "Eggetarian", "Jain", "Vegan"], {
    message: "Please select your diet preference.",
  }),
  height: z.string().nonempty({ message: "Please select your height." }),
  subCommunity: z.string().nonempty({ message: "Please select your sub-community." }),
  partnerCommunityPreference: z.boolean().optional(),
});

export function Step2() {
  const { profileData, setProfileData, nextStep, prevStep } = useProfileStore();

  // Initialize the form with default values from the store
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: profileData.city || "",
      livesWithFamily: profileData.livesWithFamily || "",
      familyCity: profileData.familyCity || "",
      maritalStatus: profileData.maritalStatus || "",
      diet: profileData.diet || "",
      height: profileData.height || "",
      subCommunity: profileData.subCommunity || "",
      partnerCommunityPreference: profileData.partnerCommunityPreference || false,
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    setProfileData(values);
    nextStep();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md space-y-6">
        <h2 className="text-2xl font-bold mb-4">Let's create your Profile now</h2>

        {/* City you live in */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City you live in *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="City1">City 1</SelectItem>
                  <SelectItem value="City2">City 2</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* You live with your family? */}
        <FormField
          control={form.control}
          name="livesWithFamily"
          render={({ field }) => (
            <FormItem>
              <FormLabel>You live with your family? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="Yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="No" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City your family lives in */}
        <FormField
          control={form.control}
          name="familyCity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City your family lives in? *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="City1">City 1</SelectItem>
                  <SelectItem value="City2">City 2</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Marital Status */}
        <FormField
          control={form.control}
          name="maritalStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your marital status *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Never Married">Never Married</SelectItem>
                  <SelectItem value="Divorced">Divorced</SelectItem>
                  <SelectItem value="Widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Diet */}
        <FormField
          control={form.control}
          name="diet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your diet</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-3"
                >
                  {["Veg", "Non-Veg", "Occasionally Non-Veg", "Eggetarian", "Jain", "Vegan"].map(
                    (option) => (
                      <FormItem key={option} className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value={option} />
                        </FormControl>
                        <FormLabel className="font-normal">{option}</FormLabel>
                      </FormItem>
                    )
                  )}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Height */}
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your height *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select height" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="5ft 7in - 170cm">5ft 7in - 170cm</SelectItem>
                  <SelectItem value="5ft 8in - 173cm">5ft 8in - 173cm</SelectItem>
                  <SelectItem value="5ft 9in - 175cm">5ft 9in - 175cm</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Sub-Community */}
        <FormField
          control={form.control}
          name="subCommunity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your sub-community *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sub-community" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Brahmin - Sanadya">Brahmin - Sanadya</SelectItem>
                  <SelectItem value="Brahmin - Gaur">Brahmin - Gaur</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Partner Community Preference */}
        <FormField
          control={form.control}
          name="partnerCommunityPreference"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-sm font-normal">
                Not particular about my Partner's Community (Caste No Bar)
              </FormLabel>
            </FormItem>
          )}
        />

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600">
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
}