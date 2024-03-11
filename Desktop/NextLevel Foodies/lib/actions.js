'use server';
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import Error from "@/app/meals/error";
import { revalidatePath } from "next/cache";

function isValidInput (text) {
  return !text || text.trim() == "";
}

 export async function shareMeal (formData) {
    const meal = {
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      creator: formData.get('name'),
      creator_email: formData.get('email'),
      image: formData.get('image')
    }
    
    if (isValidInput(meal.title) || isValidInput(meal.summary) || isValidInput(meal.instructions) || isValidInput(meal.creator) || isValidInput(meal.creator_email) || !meal.creator_email.includes("@") || !meal.image || meal.image.size == 0 ) {
      throw new Error ("Invalid input.")
      return;
    }
    await saveMeal(meal);
    revalidatePath("/meals");
    redirect("/meals");
  }