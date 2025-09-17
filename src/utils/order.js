export const getMonthlyOrders = (orders) => {
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const counts = {};
  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    const month = monthNames[date.getMonth()];
    counts[month] = (counts[month] || 0) + 1;
  });

  return Object.keys(counts).map((month) => ({
    month,
    orders: counts[month],
  }));
};

export const getMonthlyRevenue = (orders) => {
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const revenue = {};
  orders.forEach((order) => {
    if(order.status==='delivered'){
      const date = new Date(order.createdAt);
      const month = monthNames[date.getMonth()];
      revenue[month] = (revenue[month] || 0) + Number(order.amount);
    }
  });

  return Object.keys(revenue).map((month) => ({
    month,
    revenue: revenue[month],
  }));
};

export const getStatusDistribution = (orders) => {
  const counts = { pending: 0, active: 0, delivered: 0, rejected: 0 };

  orders.forEach((order) => {
    const status = order.status?.toLowerCase();
    if (status && counts[status] !== undefined) {
      counts[status] += 1;
    }
  });

  return Object.keys(counts).map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: counts[key],
  }));
};
