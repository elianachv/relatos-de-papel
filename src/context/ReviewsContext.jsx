import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const ReviewsContext = createContext(null);

export function ReviewsProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState({});

  // Cargar todas las reseñas desde localStorage al iniciar
  useEffect(() => {
    const storedReviews = localStorage.getItem("book_reviews");
    if (storedReviews) {
      try {
        setReviews(JSON.parse(storedReviews));
      } catch (error) {
        console.error("Error al cargar reseñas desde localStorage:", error);
        setReviews({});
      }
    }
  }, []);

  // Guardar reseñas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("book_reviews", JSON.stringify(reviews));
  }, [reviews]);

  // Verificar si el usuario ha comprado un libro específico
  const hasUserPurchasedBook = (bookTitle) => {
    if (!isAuthenticated || !user?.email) {
      return false;
    }

    const pedidosKey = `pedidos_${user.email}`;
    const pedidosExistentes = localStorage.getItem(pedidosKey);

    if (!pedidosExistentes) {
      return false;
    }

    try {
      const pedidos = JSON.parse(pedidosExistentes);
      // Verificar si algún pedido contiene el libro
      return pedidos.some((pedido) =>
        pedido.items?.some((item) => item.titulo === bookTitle)
      );
    } catch (error) {
      console.error("Error al verificar compra del libro:", error);
      return false;
    }
  };

  // Obtener reseñas de un libro específico
  const getReviews = (bookTitle) => {
    return reviews[bookTitle] || [];
  };

  // Agregar una nueva reseña
  const addReview = (bookTitle, reviewText) => {
    if (!isAuthenticated || !user?.email) {
      throw new Error("Debes estar autenticado para publicar una reseña");
    }

    if (!hasUserPurchasedBook(bookTitle)) {
      throw new Error("Debes haber comprado este libro para publicar una reseña");
    }

    if (!reviewText || !reviewText.trim()) {
      throw new Error("La reseña no puede estar vacía");
    }

    const newReview = {
      id: Date.now().toString(),
      userEmail: user.email,
      userName: user.email.split("@")[0], // Usar parte del email como nombre de usuario
      text: reviewText.trim(),
      date: new Date().toISOString(),
    };

    setReviews((prevReviews) => {
      const bookReviews = prevReviews[bookTitle] || [];
      // Verificar si el usuario ya tiene una reseña para este libro
      const existingReviewIndex = bookReviews.findIndex(
        (review) => review.userEmail === user.email
      );

      let updatedReviews;
      if (existingReviewIndex >= 0) {
        // Actualizar reseña existente
        updatedReviews = [...bookReviews];
        updatedReviews[existingReviewIndex] = newReview;
      } else {
        // Agregar nueva reseña
        updatedReviews = [...bookReviews, newReview];
      }

      return {
        ...prevReviews,
        [bookTitle]: updatedReviews,
      };
    });

    return newReview;
  };

  // Verificar si el usuario puede publicar una reseña (está autenticado y ha comprado el libro)
  const canUserPostReview = (bookTitle) => {
    return isAuthenticated && hasUserPurchasedBook(bookTitle);
  };

  const value = {
    reviews,
    getReviews,
    addReview,
    hasUserPurchasedBook,
    canUserPostReview,
    isAuthenticated,
  };

  return (
    <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error("useReviews must be used inside ReviewsProvider");
  }
  return context;
}

