import AddressCard, { ListAddressCard } from "@/components/AddressCard";
import { Portal } from "@/components/Portal";
import { PATH, PROFILE_TITLE_ID } from "@/config";
import { useQuery } from "@/hooks/useQuery";
import { userService } from "@/services/user";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function Address() {
  const { loading, data, reFetch } = useQuery({
    queryFn: () => userService.getAddress(),
    onSuccess: (res) => {
      res.data.sort((e) => (e.default ? -1 : 0));
    },
  });

  return (
    <div className="row">
      <Helmet>
        <title>Sổ địa chỉ</title>
      </Helmet>
      <Portal selector={PROFILE_TITLE_ID}>Sổ địa chỉ</Portal>
      {/* {loading
        ? Array.from(Array(3)).map((_, i) => <AddressCard key={i} loading />)
        : data?.data?.map((e) => <AddressCard key={e._id} {...e} />)} */}

      <ListAddressCard
        data={data?.data}
        loading={!data?.data && loading}
        onGetAddressDefault={reFetch}
      />
      <div className="col-12">
        {/* Button */}
        <Link
          className="btn btn-block btn-lg btn-outline-border"
          to={PATH.Profile.NewAddress}
        >
          Add Address <i className="fe fe-plus" />
        </Link>
      </div>
    </div>
  );
}
