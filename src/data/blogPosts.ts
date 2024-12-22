import { BlogPost } from "@/types/blog";
import { startupNationPosts } from "./blogPosts/startupNationPosts";
import { fundingPosts } from "./blogPosts/fundingPosts";
import { innovationPosts } from "./blogPosts/innovationPosts";

export const blogPosts: BlogPost[] = [
  ...startupNationPosts,
  ...fundingPosts,
  ...innovationPosts
];