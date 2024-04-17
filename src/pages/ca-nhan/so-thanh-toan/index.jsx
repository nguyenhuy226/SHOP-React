import { ListAddressCard } from "@/components/AddressCard";
import { ListPaymentCard } from "@/components/PaymentCard";
import { PATH } from "@/config";
import { useQuery } from "@/hooks/useQuery";
import { userService } from "@/services/user";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function Payment() {
  const { data, loading, reFetch } = useQuery({
    queryFn: () => userService.getPayment(),
    onSuccess: (res) => {
      res.data.sort((e) => (e.default ? -1 : 0));
    },
  });

  return (
    <div className="row">
      <Helmet>
        <title>Sổ thanh toán</title>
      </Helmet>
      <ListPaymentCard
        data={data?.data}
        loading={!data?.data && loading}
        onChangePaymentDefault={reFetch}
      />
      <div className="col-12">
        {/* Button */}
        <Link
          className="btn btn-block btn-lg btn-outline-border"
          to={PATH.Profile.NewPayment}
        >
          Add Payment Method <i className="fe fe-plus" />
        </Link>
      </div>
    </div>
  );
}
