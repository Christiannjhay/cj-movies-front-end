import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function SearchBar() {
  const navigate = useNavigate();
  const { handleSubmit, control, reset } = useForm();

  const onSubmit = (formData: any) => {
    navigate(`/search-results?query=${formData.searchTerm}`);
    reset();
  };
  const form = useForm();

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-3/4 lg:w-2/4">
        <FormField
          control={control}
          name="searchTerm"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  type="text"
                  placeholder="Search movies..."
                  {...field}
                  className="flex-grow rounded-l-2xl rounded-r-none p-4 bg-[#292929] text-white sm:text-center"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-[#ff3131] text-white rounded-r-xl rounded-l-none p-4 hover:bg-gray-800 flex items-center"
        >
          <FontAwesomeIcon icon={faSearch} className="text-black" />
        </Button>
      </form>
    </Form>
  );
}
