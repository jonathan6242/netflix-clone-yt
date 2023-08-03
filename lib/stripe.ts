import {
  getStripePayments,
} from '@stripe/firestore-stripe-payments'
import { getFunctions, httpsCallable } from '@firebase/functions'
import app, { db } from '../firebase'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import getStripe from "./initializeStripe"

const payments = getStripePayments(app, {
  productsCollection: 'products',
  customersCollection: 'customers',
})

const loadProducts = async () => {
  const data = await getDocs(
    query(
      collection(db, "products"),
      where("active", "==", true)
    )
  );
  interface Product {
    id: string
    prices?: any
  }
  const products: Product[] = data.docs.map((doc) => {
    const product = { ...doc.data(), id: doc.id };
    return product;
  });
  const pricesData = await Promise.all(
    products.map((product) => {
      return getDocs(collection(db, "products", product.id, "prices"));
    })
  );
  const pricesList = pricesData.map((element) =>
    element.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  );
  products.forEach((_, index) => {
    products[index].prices = pricesList[index];
  })

  return products
}

const loadCheckout = async (uid: string, priceId: string) => {
  const checkoutSessionRef = await addDoc(collection(db, "customers", uid, "checkout_sessions"), ({
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin
  }))

  onSnapshot(checkoutSessionRef, async (snap) => {
    const { sessionId } = snap.data() as any;
    if(sessionId) {
      const stripe = await getStripe();
      stripe?.redirectToCheckout({sessionId})
    }
  })
}

const goToBillingPortal = async () => {
  const instance = getFunctions(app, 'us-central1');
  const functionRef = httpsCallable(instance, "ext-firestore-stripe-payments-createPortalLink")
  await functionRef({
    returnUrl: `${window.location.origin}/account`
  })
    .then(({ data }: any) => window.location.assign(data.url))
    .catch((error) => console.log(error.message))
}

function timestampToDate(timestamp?: string): string {
  if (!timestamp) return "";
  const seconds: number = +timestamp?.slice(18).split(",")[0];
  const date = new Date(seconds * 1000);

  return date.toUTCString();
}

export { loadCheckout, loadProducts, goToBillingPortal, timestampToDate }
export default payments