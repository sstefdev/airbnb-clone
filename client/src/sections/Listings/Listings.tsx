import React, { FC } from "react";
import { useQuery, useMutation } from "../../lib/api";
import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariables,
} from "./types";

const LISTINGS = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

const Listings: FC<Props> = ({ title }) => {
  const { data, refetch, loading, error } = useQuery<ListingsData>(LISTINGS);
  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ id });
    refetch();
  };

  const listings = data ? data.listings : [];

  const listingsList = (
    <ul>
      {listings?.map((listing) => (
        <li key={listing.id}>
          {listing.title}{" "}
          <button onClick={() => handleDeleteListing(listing.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Something went wrong - please try again later</h2>;
  }

  const deleteListingLoadingMessage = deleteListingLoading && (
    <h4>Deletion in profress....</h4>
  );

  const deleteListingErrorMessage = deleteListingError && (
    <h4>Something went wrong - please try again later</h4>
  );

  return (
    <div>
      <h2>{title}</h2>
      {listingsList}
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
    </div>
  );
};

export default Listings;
