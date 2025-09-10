import Joi from "joi";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const userResolver = {
  Query: {
    users: async (_, __, { user }) => {
      if (!user) throw new Error("Authentication required.");
      try {
        return await User.find();
      } catch (err) {
        throw new Error("Error fetching users: " + err.message);
      }
    },
    user: async (_, { id }, { user }) => {
      if (!user) throw new Error("Authentication required");
      try {
        const foundUser = await User.findById(id);
        if (!foundUser) throw new Error("User not found");
        return foundUser;
      } catch (err) {
        throw new Error("Error fetching user: " + err.message);
      }
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const { error } = userSchema.validate(input);
      if (error) throw new Error("Validation error: " + error.message);
      try {
        const user = new User(input);
        return await user.save();
      } catch (err) {
        if (err.code === 11000) {
          throw new Error("Email already exists");
        }
        throw new Error("Error creating user: " + err.message);
      }
    },
    updateUser: async (_, { id, input }, { user }) => {
      if (!user) throw new Error("Authentication required");
      if (user.userId !== id)
        throw new Error(
          "Unauthorized access. You can update only your profile."
        );

      try {
        const updateData = { ...input };
        if (updateData.password) {
          updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, {
          new: true,
          runValidators: true,
        });

        if (!updatedUser) throw new Error("User not found");
        return updatedUser;
      } catch (err) {
        throw new Error("Failed to update User: " + err.message);
      }
    },

    deleteUser: async (_, { id }, { user }) => {
      if (!user) throw new Error("authentication required");
      if (user.userid !== id)
        throw new Error(
          "Unauthorized access. You can delete only your profile."
        );
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) throw new Error("User not found");
        return true;
      } catch (err) {
        throw new Error("Failed to delete User: " + err.message);
      }
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Invalid Username");
      const isMatch = await user.comparePassword(password);
      if (!isMatch) throw new Error("Invalid Credentials");
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return { token, user };
    },
  },
};
