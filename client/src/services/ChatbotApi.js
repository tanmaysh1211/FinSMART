import api from "./api";

export const sendChatMessage = async (message, dateRange = "last_week") => {
  const { data } = await api.post(
    "/chatbot/message",
    { message, dateRange }
  );

  return data.reply;
};