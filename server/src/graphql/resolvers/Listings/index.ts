/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { IResolvers } from "apollo-server-express";
import { Database, Listing } from "../../../lib/types";
import { ObjectId } from "mongodb";

export const listingsResolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      return await db.listings.find({}).toArray();
    },
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      const deleteResults = await db.listings.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (!deleteResults.value) {
        throw new Error("Failed to delete listing");
      }

      return deleteResults.value;
    },
  },
  Listing: {
    id: (listing: Listing): string => listing._id.toString(),
  },
};
