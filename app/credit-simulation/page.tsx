"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, Calendar, Percent, ShieldCheck, ArrowRight } from "lucide-react";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { FloatingActions } from "@/components/floating-actions";

// Maximum Loan Limit: 100 Trillion (100,000,000,000,000)
const MAX_AMOUNT = 100000000000000;

export default function CreditSimulationPage() {
  const [amount, setAmount] = useState<number>(100000000); // Default 100 Million
  const [amountInput, setAmountInput] = useState<string>("100,000,000");
  const [period, setPeriod] = useState<number>(12);
  const [interest, setInterest] = useState<number>(10);

  const [monthlyRental, setMonthlyRental] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  // Number Formatter
  const formatNumber = (val: number): string => {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Helper function to sanitize input string & enforce MAX_AMOUNT limit
  const parseAndClampNumber = (val: string): number => {
    const cleanStr = val.replace(/,/g, "").replace(/[^\d]/g, "");
    if (!cleanStr) return 0;
    
    let parsed = parseFloat(cleanStr);
    if (isNaN(parsed)) return 0;
    
    // Apply Maximum Limit of 100 Trillion
    if (parsed > MAX_AMOUNT) {
      parsed = MAX_AMOUNT;
    }
    return parsed;
  };

  useEffect(() => {
    if (amount > 0 && interest > 0 && period > 0) {
      const calculatedRental = Math.round(
        (((interest / 1200) * period * amount + amount) / period)
      );
      const calculatedTotalPay = calculatedRental * period;
      const calculatedInterestOnly = calculatedTotalPay - amount;

      setMonthlyRental(calculatedRental);
      setTotalPayment(calculatedTotalPay);
      setTotalInterest(calculatedInterestOnly > 0 ? calculatedInterestOnly : 0);
    } else {
      setMonthlyRental(0);
      setTotalPayment(0);
      setTotalInterest(0);
    }
  }, [amount, period, interest]);

  const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const clampedValue = parseAndClampNumber(rawValue);
    
    setAmount(clampedValue);
    setAmountInput(clampedValue > 0 ? formatNumber(clampedValue) : "");
  };

  const handlePresetAmount = (presetVal: number) => {
    setAmount(presetVal);
    setAmountInput(formatNumber(presetVal));
  };

  return (
    <div className="min-h-screen bg-void text-ink-0 font-sans selection:bg-signal-teal/20 selection:text-signal-teal">
      <Nav />

      <main className="pt-28 pb-24">
        <div className="container-x max-w-6xl">

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-8 rounded-2xl border border-(--panel-border) bg-panel p-6 md:p-8 lg:col-span-7">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[13.5px] font-semibold text-ink-1 flex items-center gap-2">
                    <DollarSign size={16} className="text-signal-teal" /> Loan Amount
                  </label>
                  <span className="font-mono text-[11px] text-ink-2">Max IDR 100 Trillion</span>
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-lg font-bold text-ink-2">
                    IDR
                  </span>
                  <input
                    type="text"
                    value={amountInput}
                    onChange={handleAmountInputChange}
                    placeholder="0"
                    className="w-full rounded-xl border border-(--panel-border) bg-panel-2 py-3.5 pl-16 pr-4 font-mono text-xl font-bold text-ink-0 transition-all focus:border-signal-teal focus:outline-none focus:ring-1 focus:ring-signal-teal"
                  />
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {[50000000, 100000000, 250000000, 500000000, 1000000000, 1000000000000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handlePresetAmount(val)}
                      className={`rounded-lg border px-3 py-1.5 font-mono text-[11.5px] font-medium transition-all ${
                        amount === val
                          ? "border-signal-teal bg-signal-blue-dim text-signal-teal"
                          : "border-(--panel-border) bg-panel-2 text-ink-2 hover:border-ink-1 hover:text-ink-0"
                      }`}
                    >
                      {val >= 1000000000000
                        ? `${val / 1000000000000} T`
                        : val >= 1000000000
                        ? `${val / 1000000000} B`
                        : `${val / 1000000} M`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[13.5px] font-semibold text-ink-1 flex items-center gap-2">
                    <Calendar size={16} className="text-signal-teal" /> Loan Term / Tenor (Months)
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={period}
                      onChange={(e) => setPeriod(Number(e.target.value))}
                      className="w-20 rounded-lg border border-(--panel-border) bg-panel-2 px-2.5 py-1 text-center font-mono text-sm font-semibold text-ink-0 focus:border-signal-teal focus:outline-none"
                    />
                    <span className="text-[12px] text-ink-2 font-medium">Months</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="1"
                  max="60"
                  step="1"
                  value={period}
                  onChange={(e) => setPeriod(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-panel-2 accent-signal-teal"
                />

                <div className="flex justify-between font-mono text-[11px] text-ink-2 font-medium">
                  <span>1 Mo</span>
                  <span>12 Mos</span>
                  <span>24 Mos</span>
                  <span>36 Mos</span>
                  <span>48 Mos</span>
                  <span>60 Mos</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[13.5px] font-semibold text-ink-1 flex items-center gap-2">
                    <Percent size={16} className="text-signal-teal" /> Interest Rate (% per year)
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="0"
                      max="40"
                      step="0.1"
                      value={interest}
                      onChange={(e) => setInterest(Number(e.target.value))}
                      className="w-20 rounded-lg border border-(--panel-border) bg-panel-2 px-2.5 py-1 text-center font-mono text-sm font-semibold text-ink-0 focus:border-signal-teal focus:outline-none"
                    />
                    <span className="text-[12px] text-ink-2 font-medium">%</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max="40"
                  step="0.5"
                  value={interest}
                  onChange={(e) => setInterest(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-panel-2 accent-signal-teal"
                />

                <div className="flex justify-between font-mono text-[11px] text-ink-2 font-medium">
                  <span>0%</span>
                  <span>10%</span>
                  <span>20%</span>
                  <span>30%</span>
                  <span>40%</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-(--panel-border) bg-panel p-6 md:p-8 lg:col-span-5">
              <div>
                <div className="flex items-center justify-between border-b border-(--panel-border) pb-4">
                  <span className="mono-label">Calculation Results</span>
                  <span className="rounded-md bg-signal-blue-dim px-2.5 py-1 font-mono text-[11px] font-semibold text-signal-teal">
                    FLAT RATE
                  </span>
                </div>

                <div className="mt-6 rounded-xl border border-(--panel-border) bg-panel-2 p-5 text-center overflow-hidden">
                  <div className="text-[13px] font-medium text-ink-2">Estimated Monthly Payment</div>
                  
                  <motion.div
                    key={monthlyRental}
                    initial={{ scale: 0.97, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-2 flex items-baseline justify-center gap-1.5 font-mono font-bold tracking-tight text-signal-teal"
                  >
                    <span className="text-base font-normal text-ink-2 shrink-0">IDR</span>
                    <span className="break-all text-xl sm:text-2xl md:text-3xl leading-tight">
                      {formatNumber(monthlyRental)}
                    </span>
                  </motion.div>
                  
                  <div className="mt-2 text-[12px] text-ink-2">
                    per month for <span className="font-semibold text-ink-0">{period} months</span>
                  </div>
                </div>

                <div className="mt-6 space-y-4 border-t border-(--panel-border) pt-5 text-[13px]">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <span className="text-ink-2 shrink-0">Principal Amount:</span>
                    <span className="font-mono font-medium text-ink-0 break-all text-right">
                      IDR {formatNumber(amount)}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <span className="text-ink-2 shrink-0">Estimated Total Interest:</span>
                    <span className="font-mono font-medium text-ink-0 break-all text-right">
                      IDR {formatNumber(totalInterest)}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 pt-2 border-t border-(--panel-border)">
                    <span className="font-semibold text-ink-1 shrink-0">Total Repayment:</span>
                    <span className="font-mono font-bold text-ink-0 text-[14px] break-all text-right">
                      IDR {formatNumber(totalPayment)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-(--panel-border) space-y-3">
                <Button asChild variant="primary" className="w-full flex justify-center items-center gap-2 text-[14px]">
                  <a href="/contact">
                    Consult Core System Integration <ArrowRight size={16} />
                  </a>
                </Button>
                <p className="text-center text-[11px] text-ink-2 leading-relaxed">
                  *The calculation above is an initial simulation estimate. Actual figures may vary based on regulations and specific interest rate schemes of your financing institution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}