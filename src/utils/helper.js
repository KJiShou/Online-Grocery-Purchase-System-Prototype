import { MaybankIcon, PublicBankIcon, CimbIcon, GPayIcon, TngIcon, CashIcon, TruckIcon } from "../components/Icons";

export function formatPrice(value) {
  return `RM${value.toFixed(2)}`
}

// 模拟生成 #PDY-XXXX-XXXX 格式的订单号
export const generateOrderID = () => {
  // 生成 1000 到 9999 之间的随机整数
  const randomPart1 = Math.floor(1000 + Math.random() * 9000);
  const randomPart2 = Math.floor(1000 + Math.random() * 9000);
  
  return `#PDY-${randomPart1}-${randomPart2}`;
};

// 按照你 UI 设计的格式 (如: 7-Jan-2026 13:25) 生成当前时间
export const generateOrderDate = () => {
  const date = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

export const paymentMethods = {
  maybank: { label: 'Maybank2U', icon: MaybankIcon },
  publicbank: { label: 'Public Bank', icon: PublicBankIcon },
  cimb: { label: 'CIMB Clicks', icon: CimbIcon },
  gpay: { label: 'Google Pay', icon: GPayIcon },
  tng: { label: 'Touch \'n Go', icon: TngIcon },
  cod: { label: 'Cash On Delivery', icon: CashIcon },
}