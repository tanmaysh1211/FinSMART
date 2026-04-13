import axios from "axios";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const sendChatMessage = async (message, dateRange = "last_week") => {
  const { data } = await axios.post(
    "/api/chatbot/message",
    { message, dateRange },
    { headers: getAuthHeader() }
  );
  return data.reply;
};