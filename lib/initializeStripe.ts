import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Stripe | null;

const initializeStripe = async () => {
  if(!stripePromise) {
    stripePromise = await loadStripe(
      "pk_test_51NaX4iGfyIeGSwJbP9exzaxEago1v2nB3UNmf9Qsw0mYRAiTyLusu7cpM3r4x5h0V0miQnT2VkqHeM0zbjKpbMqe00nFiS5vHM"
    );
  }
  return stripePromise
}

export default initializeStripe