import { prisma } from "@/lib/prisma";

// Create plant
export const createPlant = async (data: {
  name: string;
  description: string;
  title?: string;
  subtitle?: string;
  userId: string;
  imageUrl?: string;
}) => {
  return await prisma.plant.create({ data });
};

// Get all plants
export const getAllPlants = async () => {
  return await prisma.plant.findMany();
};

// Get plant by ID
export const getPlantById = async (id: string) => {
  return await prisma.plant.findUnique({ where: { id } });
};

// Update plant
export const updatePlant = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    title?: string;
    subtitle?: string;
    userId?: string;
    imageUrl?: string;
  },
) => {
  return await prisma.plant.update({ where: { id }, data });
};

// Delete plant
export const deletePlant = async (id: string) => {
  return await prisma.plant.delete({ where: { id } });
};
