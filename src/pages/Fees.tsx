import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  ExternalLink,
  Receipt,
  Wallet,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const feeSummary = {
  totalFees: 25000,
  paidAmount: 15000,
  remainingAmount: 10000,
  dueDate: "2024/04/15",
};

const feeBreakdown = [
  { name: "الرسوم الدراسية", amount: 20000, status: "paid" },
  { name: "رسوم الكتب والقرطاسية", amount: 1500, status: "paid" },
  { name: "رسوم الأنشطة", amount: 1000, status: "pending" },
  { name: "رسوم النقل المدرسي", amount: 2500, status: "pending" },
];

const invoices = [
  {
    id: "INV-2024-001",
    date: "2024/01/15",
    amount: 10000,
    status: "paid",
    description: "القسط الأول",
  },
  {
    id: "INV-2024-002",
    date: "2024/02/15",
    amount: 5000,
    status: "paid",
    description: "القسط الثاني",
  },
  {
    id: "INV-2024-003",
    date: "2024/03/15",
    amount: 5000,
    status: "pending",
    description: "القسط الثالث",
  },
  {
    id: "INV-2024-004",
    date: "2024/04/15",
    amount: 5000,
    status: "upcoming",
    description: "القسط الرابع",
  },
];

const statusConfig = {
  paid: { label: "مدفوع", color: "bg-green-500", textColor: "text-green-500", icon: CheckCircle2 },
  pending: { label: "مستحق", color: "bg-yellow-500", textColor: "text-yellow-500", icon: AlertCircle },
  upcoming: { label: "قادم", color: "bg-blue-500", textColor: "text-blue-500", icon: Clock },
};

const Fees = () => {
  const navigate = useNavigate();

  const paidPercentage = (feeSummary.paidAmount / feeSummary.totalFees) * 100;

  const handlePayment = () => {
    // This would redirect to the payment gateway
    window.open("https://payment.example.com", "_blank");
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate("/dashboard")}
        >
          <ChevronLeft className="w-5 h-5 ml-2" />
          العودة للوحة التحكم
        </Button>

        {/* Page Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">الرسوم والسداد</h1>
          <p className="text-muted-foreground">إدارة الرسوم الدراسية</p>
        </div>

        {/* Summary Card */}
        <Card variant="gradient" className="animate-slide-up">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-primary-foreground/80 text-sm">إجمالي الرسوم</p>
                <p className="text-3xl font-bold text-primary-foreground">
                  {feeSummary.totalFees.toLocaleString()} ريال
                </p>
              </div>
              <div className="w-16 h-16 bg-primary-foreground/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Wallet className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-primary-foreground/80">
                <span>المدفوع: {feeSummary.paidAmount.toLocaleString()} ريال</span>
                <span>{Math.round(paidPercentage)}%</span>
              </div>
              <Progress value={paidPercentage} className="h-3 bg-primary-foreground/20" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary-foreground/60">المتبقي</p>
                <p className="text-xl font-bold text-primary-foreground">
                  {feeSummary.remainingAmount.toLocaleString()} ريال
                </p>
              </div>
              <div className="text-left">
                <p className="text-sm text-primary-foreground/60">تاريخ الاستحقاق</p>
                <p className="font-medium text-primary-foreground">{feeSummary.dueDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pay Now Button */}
        <Button className="w-full h-14 text-lg" onClick={handlePayment}>
          <CreditCard className="w-6 h-6 ml-2" />
          سداد الآن
          <ExternalLink className="w-4 h-4 mr-2" />
        </Button>

        {/* Fee Breakdown */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="text-lg">تفاصيل الرسوم</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {feeBreakdown.map((fee, index) => {
              const status = statusConfig[fee.status as keyof typeof statusConfig];

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-2 h-10 rounded-full", status.color)} />
                    <div>
                      <p className="font-medium text-foreground">{fee.name}</p>
                      <Badge variant="outline" className={cn("text-xs", status.textColor)}>
                        {status.label}
                      </Badge>
                    </div>
                  </div>
                  <p className="font-bold text-foreground">{fee.amount.toLocaleString()} ريال</p>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Invoices */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Receipt className="w-5 h-5 text-primary" />
              الفواتير
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {invoices.map((invoice) => {
              const status = statusConfig[invoice.status as keyof typeof statusConfig];
              const Icon = status.icon;

              return (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", status.color)}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{invoice.description}</p>
                      <p className="text-sm text-muted-foreground">{invoice.id}</p>
                      <p className="text-xs text-muted-foreground">{invoice.date}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-foreground">{invoice.amount.toLocaleString()} ريال</p>
                    {invoice.status === "paid" && (
                      <Button variant="ghost" size="sm" className="text-primary p-0 h-auto">
                        <Download className="w-4 h-4 ml-1" />
                        الإيصال
                      </Button>
                    )}
                    {invoice.status === "pending" && (
                      <Button size="sm" className="mt-1" onClick={handlePayment}>
                        سداد
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Payment Methods Info */}
        <Card variant="outline" className="bg-muted/30">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              يمكنك السداد عبر البطاقات البنكية أو سداد أو Apple Pay
            </p>
          </CardContent>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Fees;
