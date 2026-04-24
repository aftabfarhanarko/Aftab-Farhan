// import { prisma } from "@/lib/prisma";

// // Get all users
// export const getAllUsers = async () => {
//   try {
//     return await prisma.user.findMany({
//       select: {
//         id: true,
//         email: true,
//         name: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching all users:", error);
//     throw error;
//   }
// };

// // Get user by ID
// export const getUserById = async (id: string) => {
//   try {
//     return await prisma.user.findUnique({
//       where: { id },
//       select: {
//         id: true,
//         email: true,
//         name: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//     });
//   } catch (error) {
//     console.error(`Error fetching user with ID ${id}:`, error);
//     throw error;
//   }
// };

// // Get user by email
// export const getUserByEmail = async (email: string) => {
//   try {
//     return await prisma.user.findUnique({
//       where: { email },
//     });
//   } catch (error) {
//     console.error(`Error fetching user with email ${email}:`, error);
//     throw error;
//   }
// };

// // Update user
// export const updateUser = async (
//   id: string,
//   data: {
//     name?: string;
//     email?: string;
//     password?: string;
//   }
// ) => {
//   try {
//     return await prisma.user.update({
//       where: { id },
//       data,
//       select: {
//         id: true,
//         email: true,
//         name: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//     });
//   } catch (error) {
//     console.error(`Error updating user with ID ${id}:`, error);
//     throw error;
//   }
// };

// // Delete user
// export const deleteUser = async (id: string) => {
//   try {
//     return await prisma.user.delete({
//       where: { id },
//     });
//   } catch (error) {
//     console.error(`Error deleting user with ID ${id}:`, error);
//     throw error;
//   }
// };