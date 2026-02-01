import Paystack from "paystack";

/**
 * Paystack payment service
 */
class PaystackService {
  private paystack: Paystack;

  constructor() {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    
    if (!secretKey) {
      if (process.env.NODE_ENV === "production") {
        throw new Error("PAYSTACK_SECRET_KEY environment variable is not set");
      }
      console.warn("⚠️  PAYSTACK_SECRET_KEY not set - payment service will be disabled");
      this.paystack = null as any;
      return;
    }

    this.paystack = Paystack(secretKey);
  }

  /**
   * Initialize payment transaction
   */
  async initializePayment(data: {
    email: string;
    amount: number; // Amount in kobo (smallest currency unit)
    currency?: string;
    reference?: string;
    metadata?: Record<string, any>;
    callbackUrl?: string;
  }): Promise<{
    authorizationUrl: string;
    accessCode: string;
    reference: string;
  }> {
    if (!this.paystack) {
      throw new Error("Paystack service is not configured. Please set PAYSTACK_SECRET_KEY in your environment variables.");
    }

    try {
      const response = await this.paystack.transaction.initialize({
        email: data.email,
        amount: data.amount,
        currency: data.currency || "KES",
        reference: data.reference,
        metadata: data.metadata,
        callback_url: data.callbackUrl,
      });

      if (!response.status) {
        throw new Error(response.message || "Failed to initialize payment");
      }

      return {
        authorizationUrl: response.data.authorization_url,
        accessCode: response.data.access_code,
        reference: response.data.reference,
      };
    } catch (error) {
      console.error("❌ Error initializing Paystack payment:", error);
      throw error;
    }
  }

  /**
   * Verify payment transaction
   */
  async verifyPayment(reference: string): Promise<{
    status: boolean;
    amount: number;
    currency: string;
    customer: {
      email: string;
    };
    metadata?: Record<string, any>;
  }> {
    if (!this.paystack) {
      throw new Error("Paystack service is not configured. Please set PAYSTACK_SECRET_KEY in your environment variables.");
    }

    try {
      const response = await this.paystack.transaction.verify(reference);

      if (!response.status) {
        throw new Error(response.message || "Failed to verify payment");
      }

      return {
        status: response.data.status === "success",
        amount: response.data.amount / 100, // Convert from kobo to currency unit
        currency: response.data.currency,
        customer: {
          email: response.data.customer.email,
        },
        metadata: response.data.metadata,
      };
    } catch (error) {
      console.error("❌ Error verifying Paystack payment:", error);
      throw error;
    }
  }

  /**
   * Convert amount to kobo (Paystack's smallest currency unit)
   */
  convertToKobo(amount: number): number {
    // For KES, 1 KES = 100 kobo (though KES doesn't use kobo, Paystack uses this format)
    // For most currencies, multiply by 100
    return Math.round(amount * 100);
  }
}

// Lazy-loaded singleton instance
let paystackServiceInstance: PaystackService | null = null;

export function getPaystackService(): PaystackService {
  if (!paystackServiceInstance) {
    paystackServiceInstance = new PaystackService();
  }
  return paystackServiceInstance;
}

// Export for convenience (but it's lazy-loaded)
export const paystackService = {
  initializePayment: (data: Parameters<PaystackService["initializePayment"]>[0]) => 
    getPaystackService().initializePayment(data),
  verifyPayment: (reference: string) => 
    getPaystackService().verifyPayment(reference),
  convertToKobo: (amount: number) => 
    getPaystackService().convertToKobo(amount),
};
