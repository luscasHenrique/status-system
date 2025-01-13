export interface StatusDeliveryStep {
  label: string;
  date?: string;
  time?: string;
  isCompleted: boolean;
  isCurrent: boolean;
  statusType:
    | 'preparation'
    | 'shipped'
    | 'inTransit'
    | 'outForDelivery'
    | 'delivered';
}
