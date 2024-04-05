"use server";
import { revalidatePath } from "next/cache";

export async function revalidateAdminCommentsPath() {
  revalidatePath("/admin/[garageSlug]/comments");
}
