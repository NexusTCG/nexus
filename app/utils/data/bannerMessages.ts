type BannerMessageType = {
  message: string;
  type: "warning" | "info" | "error";
};

export const bannerMessages = {
  copyrightWarning: {
    type: "warning",
    message: "Do not deliberately attempt to create cards that would violate the intellectual property of others. Such as the names or likeness of recognizable characters, places, or items from other games, movies, real life, etc. Doing so will result in a warning or termination of your account.",
  } as BannerMessageType,
}