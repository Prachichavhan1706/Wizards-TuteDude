// Example path: src/components/RecommendedSuppliers.jsx

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Adjust path if needed

function RecommendedSuppliers({ categoryCode, locationCode }) {
  const [recommendedSuppliers, setRecommendedSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (categoryCode == null || locationCode == null) {
      setRecommendedSuppliers([]);
      return;
    }

    async function fetchRecommendations() {
      setLoading(true);
      setError(null);
      try {
        const docId = `cat_${categoryCode}_loc_${locationCode}`;
        const recRef = doc(db, "recommendations", docId);
        const recSnap = await getDoc(recRef);

        if (recSnap.exists()) {
          const recData = recSnap.data();
          setRecommendedSuppliers(recData.suppliers || []);
        } else {
          setRecommendedSuppliers([]);
        }
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError("Failed to load recommendations.");
      } finally {
        setLoading(false);
      }
    }
    fetchRecommendations();
  }, [categoryCode, locationCode]);

  if (loading) return <p>Loading recommendations...</p>;
  if (error) return <p>{error}</p>;
  if (recommendedSuppliers.length === 0)
    return <p>No recommendations available for the selected filters.</p>;

  return (
    <section>
      <h3>Recommended Suppliers</h3>
      <ul>
        {recommendedSuppliers.map(({ supplierId, predicted_quality }) => (
          <li key={supplierId} style={{ marginBottom: "8px" }}>
            Supplier ID: {supplierId} — Predicted Quality: {predicted_quality.toFixed(2)}
            {/* You can fetch and display more supplier info if desired */}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RecommendedSuppliers;
