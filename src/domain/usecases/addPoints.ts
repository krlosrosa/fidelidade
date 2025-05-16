export type AddPointsProps = {
  tenant_id: string
  customer_id: string
  points: number
  type: 'earn'| 'redeem' | 'adjustment'
};

export interface AddPoints {
  addPoints: (client: AddPointsProps) => Promise<AddPointsProps>;
}
