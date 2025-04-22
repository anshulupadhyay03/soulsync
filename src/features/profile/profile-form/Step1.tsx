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
import { useProfileStore } from "../data/profileStore";
import { Country, State, City } from "country-state-city"; // Import the library
import { useState } from "react";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First Name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last Name must be at least 2 characters." }),
  gender: z.string().nonempty({ message: "Please select a gender." }),
  dob: z.string().nonempty({ message: "Please select a date of birth." }),
  religion: z.string().nonempty({ message: "Please select a religion." }),
  city: z.string().nonempty({ message: "Please select a city." }),
  state: z.string().nonempty({ message: "Please select a state." }),
  country: z.string().nonempty({ message: "Please select a country." }),
});

export function Step1() {
  const { profileData, setProfileData, nextStep } = useProfileStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: profileData,
  });


  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setProfileData(values);
    nextStep();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md space-y-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="religion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Religion</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select religion" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Hindu">Hindu</SelectItem>
                  <SelectItem value="Muslim">Muslim</SelectItem>
                  <SelectItem value="Sikh">Sikh</SelectItem>
                  <SelectItem value="Christian">Christian</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-4">
          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
          <FormLabel>Country</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              setSelectedCountry(value); // Update selected country
              setSelectedState(null); // Reset state when country changes
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Country.getAllCountries().map((country) => (
                <SelectItem key={country.isoCode} value={country.isoCode}>
            {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
              </FormItem>
            )}
          />

          {/* State */}
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="flex-1">
          <FormLabel>State</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              setSelectedState(value); // Update selected state
            }}
            defaultValue={field.value}
            disabled={!selectedCountry} // Disable if no country is selected
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {selectedCountry &&
                State.getStatesOfCountry(selectedCountry).map((state) => (
            <SelectItem key={state.isoCode} value={state.isoCode}>
              {state.name}
            </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <FormMessage />
              </FormItem>
            )}
          />

          {/* City */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
          <FormLabel>City</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={!selectedState} // Disable if no state is selected
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {selectedState &&
                City.getCitiesOfState(selectedCountry || "", selectedState).map((city) => (
            <SelectItem key={city.name} value={city.name}>
              {city.name}
            </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="bg-primary hover:bg-primary-hover">Continue</Button>
        </div>
      </form>
    </Form>
  );
}