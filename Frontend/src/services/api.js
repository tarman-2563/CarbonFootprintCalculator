import axios from "axios";

const API_BASE_URL = "http://localhost:3737";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const createActivity = async (activityData) => {
  const response = await api.post("/activity", activityData);
  return response.data;
};

export const getActivities = async (params = {}) => {
  const response = await api.get("/activity", { params });
  return response.data;
};

export const getActivityById = async (id) => {
  const response = await api.get(`/activity/${id}`);
  return response.data;
};

export const calculateEmissions = async (activityData) => {
  const response = await api.post("/emission/calculate", activityData);
  return response.data;
};

export const getTotalEmissions = async (params = {}) => {
  const response = await api.get("/emission/total", { params });
  return response.data;
};

export const getEmissionsByPeriod = async (params = {}) => {
  const response = await api.get("/emission/period", { params });
  return response.data;
};


export const getOffsetSuggestions = (co2eAmount) => {
  // Hardcoded offset suggestions
  return [
    {
      id: 1,
      name: "Renewable Energy Project",
      location: "India",
      co2eOffset: co2eAmount * 0.5,
      cost: co2eAmount * 0.02,
      description: "Support renewable energy projects to offset your carbon footprint",
    },
    {
      id: 2,
      name: "Reforestation Project",
      location: "Brazil",
      co2eOffset: co2eAmount * 0.3,
      cost: co2eAmount * 0.015,
      description: "Plant trees to sequester carbon from the atmosphere",
    },
    {
      id: 3,
      name: "Clean Water Project",
      location: "Kenya",
      co2eOffset: co2eAmount * 0.2,
      cost: co2eAmount * 0.01,
      description: "Support clean water initiatives that reduce carbon emissions",
    },
  ];
};


export default api;