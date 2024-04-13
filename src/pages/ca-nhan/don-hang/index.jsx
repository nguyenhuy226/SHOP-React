import { ListOrder } from "@/components/ListOrder";
import { Tab } from "@/components/Tab";
import { useQuery } from "@/hooks/useQuery";
import { useSearch } from "@/hooks/useSearch";
import { orderService } from "@/services/order";
import { Badge } from "antd";

export default function Order() {
  const [, setSearch] = useSearch();
  const { data: pendingCount } = useQuery({
    queryFn: () => orderService.getCount("?status=pending"),
  });
  const { data: confirmCount } = useQuery({
    queryFn: () => orderService.getCount("?status=confirm"),
  });
  const { data: shippingCount } = useQuery({
    queryFn: () => orderService.getCount("?status=shipping"),
  });
  return (
    <Tab
      defaultAcitve="all"
      removeOnDeActive
      onChange={() => setSearch({ page: 1 })}
    >
      <div className="nav mb-10">
        <Tab.Title value="all">Tất cả đơn</Tab.Title>
        <Badge count={pendingCount?.count}>
          <Tab.Title value="pending">Đang xử lý</Tab.Title>
        </Badge>
        <Badge count={confirmCount?.count}>
          <Tab.Title value="confirm">Đã xác nhận</Tab.Title>
        </Badge>
        <Badge count={shippingCount?.count}>
          <Tab.Title value="shipping">Đang vận chuyển</Tab.Title>
        </Badge>
        <Tab.Title value="finished">Đã giao</Tab.Title>
        <Tab.Title value="cancel">Đã hủy</Tab.Title>
      </div>
      <div className="tab-content">
        <Tab.Content value="all">
          <ListOrder />
        </Tab.Content>
        <Tab.Content value="pending">
          <ListOrder status="pending" />
        </Tab.Content>
        <Tab.Content value="confirm">
          <ListOrder status="confirm" />
        </Tab.Content>
        <Tab.Content value="shipping">
          <ListOrder status="shipping" />
        </Tab.Content>
        <Tab.Content value="finished">
          <ListOrder status="finished" />
        </Tab.Content>
        <Tab.Content value="cancel">
          <ListOrder status="cancel" />
        </Tab.Content>
      </div>
    </Tab>
  );
}
