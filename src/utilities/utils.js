function getMinMaxPrice(data) {
  const prices = data.pages
    .flatMap(p => p.items)
    .map(b => b.precio_usd)
    .filter(p => typeof p === "number");

  return {
    minPrecio: Math.min(...prices),
    maxPrecio: Math.max(...prices)
  };
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
      return "Hoy";
  } else if (diffDays === 1) {
      return "Hace 1 día";
  } else if (diffDays < 7) {
      return `Hace ${diffDays} días`;
  } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return weeks === 1 ? "Hace 1 semana" : `Hace ${weeks} semanas`;
  } else {
      return date.toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
      });
  }
}


export { getMinMaxPrice, formatDate };