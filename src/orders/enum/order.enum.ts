export enum OrderStatus {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export const OrderStatusList = [
  OrderStatus.CANCELLED,
  OrderStatus.PENDING,
  OrderStatus.DELIVERED,
];
