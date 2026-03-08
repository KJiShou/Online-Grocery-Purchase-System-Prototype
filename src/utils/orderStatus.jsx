// 定义所有合法的订单状态及其对应的 Tailwind 样式
// 严厉提醒：背景色全部采用了 500 色阶，以确保纯白文字 (text-white) 的绝对清晰可读！
export const ORDER_STATUS_CONFIG = {
  'Pending': {
    label: 'Pending',
    // 琥珀色/橙色：代表需要等待、排队中
    className: 'bg-amber-500 text-white' 
  },
  'Shipped': {
    label: 'Shipped',
    // 蓝色：代表工业化、运输中、进行中
    className: 'bg-blue-500 text-white'
  },
  'Out for Delivery': {
    label: 'Out for Delivery', // 你的“等待签收”
    // 紫色：代表特殊的高亮节点、最后一步的派送
    className: 'bg-purple-500 text-white'
  },
  'Delivered': {
    label: 'Delivered',
    // 绿色：代表成功、完成、安全
    className: 'bg-emerald-500 text-white'
  },
  'Cancelled': {
    label: 'Cancelled',
    // 红色：代表失败、取消、中止
    className: 'bg-red-500 text-white'
  }
};

export function OrderStatusTag({ status }) {
  // 严厉的兜底防御逻辑：
  // 如果后端传过来一个字典里没有的乱码状态，绝对不能让页面崩溃！必须给一个默认的灰色兜底。
  const config = ORDER_STATUS_CONFIG[status] || {
    label: status || 'Unknown',
    className: 'bg-gray-500 text-white' 
  };

  return (
    <span 
      className={`rounded-lg px-3 py-1.5 text-[13px] font-semibold tracking-wide shadow-sm ${config.className}`}
    >
      {config.label}
    </span>
  );
}