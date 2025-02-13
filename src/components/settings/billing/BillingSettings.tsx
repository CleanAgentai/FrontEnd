import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SubscriptionSection from './SubscriptionSection';
import PaymentSection from './PaymentSection';
import BillingHistorySection from './BillingHistorySection';

export default function BillingSettings() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">Billing & Payments</h2>
        <Tabs defaultValue="subscription" className="space-y-6">
          <TabsList>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
            <TabsTrigger value="history">Billing History</TabsTrigger>
          </TabsList>

          <TabsContent value="subscription">
            <SubscriptionSection />
          </TabsContent>

          <TabsContent value="payment">
            <PaymentSection />
          </TabsContent>

          <TabsContent value="history">
            <BillingHistorySection />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}