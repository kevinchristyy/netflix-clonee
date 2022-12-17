import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { db } from "../firebase";
import "./Planscreen.css";
import { loadStripe } from "@stripe/stripe-js";

function Planscreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  console.log(products);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        // Show an error to your customer and inspevt ypur Cloud Function logs in Firebase console.
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        // We have a session, let's redirect to Checkout
        // Init Stripe

        const stripe = await loadStripe(
          "pk_test_51MFb3iHi5XzC9CcBTxSwYykDEjweinaXcpewOBGuq9WzPz6IJDuEYTwmM6IQkQRQ5A4kU3hN5HZI23EcAFl3CbmA00h5RVaf1g"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="planScreen">
      {Object.entries(products).map(([productId, productData]) => {
        // TODO: add some logic to check if the users subscription is active...
        return (
          <div className="planScreen__plan">
            <div className="planScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>

              <button
                className="planScreen__button"
                onClick={() => loadCheckout(productData.prices.priceId)}
              >
                Subscribe
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Planscreen;
