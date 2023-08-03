import { Subscription, onCurrentUserSubscriptionUpdate } from "@stripe/firestore-stripe-payments";
import { User } from "firebase/auth";
import { useEffect, useState } from "react"
import payments from "@/lib/stripe";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";

function useSubscription(user: User | null) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    if(!user) return;

    onSnapshot(collection(db, "customers", user?.uid!, "subscriptions"), (snapshot) => {
      const subscriptionsData: any[] = snapshot.docs.map(doc => ({...doc.data()})).filter((subscription) => subscription.status === "active" || subscription.status === "trialing");
      setSubscription(subscriptionsData[0]);
    })

  }, [user])

  return (
    subscription
  )
}
export default useSubscription