import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/shared/Pagination";
import CatalogItem from "./CatalogItem";
import catalog_list from "../../utilities/catalog_list.json";
import { getMinMaxPrice } from "../../utilities/utils";
import "./catalog.css";
import { AppRoutes } from "../../routes/appRoutes";

const ITEMS_PER_PAGE = 10;
const DEBOUNCE_DELAY = 300;

export default function CatalogPage() {
    const { minPrecio = 0, maxPrecio = 0 } = getMinMaxPrice(catalog_list);

    /* ---------------- States ---------------- */
    const [priceFilter, setPriceFilter] = useState(minPrecio);
    const [debouncedPrice, setDebouncedPrice] = useState(minPrecio);
    const [currentPage, setCurrentPage] = useState(1);

    const [searchInput, setSearchInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    /* ---------------- Debounce precio ---------------- */
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedPrice(priceFilter);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timer);
    }, [priceFilter]);

    /* -------- Normalizar estructura -------- */
    const allItems = useMemo(() => {
        return catalog_list.pages.flatMap(page => page.items);
    }, []);

    /* -------------- Filtro combinado -------------- */
    const filteredItems = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        return allItems.filter(item => {
            const matchPrice = item.precio_usd >= debouncedPrice;

            if (!term) return matchPrice;

            const text = `
        ${item.titulo}
        ${item.autor}
        ${item.descripcion}
      `.toLowerCase();

            return matchPrice && text.includes(term);
        });
    }, [allItems, debouncedPrice, searchTerm]);

    /* ---- Reset página cuando cambia filtro ---- */
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedPrice, searchTerm]);

    /* ---------------- Paginado ---------------- */
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

    const paginatedItems = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredItems.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredItems, currentPage]);

    /* ---------------- Handlers ---------------- */
    const handlePriceFilterChange = (e) => {
        setPriceFilter(Number(e.target.value));
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchTerm(searchInput);
    };

    const handleReset = () => {
        setPriceFilter(minPrecio);
        setSearchInput("");
        setSearchTerm("");
    };

    const handleViewDetail = (book) => {
        navigate(AppRoutes.bookDetail.replace(":id", book.titulo), { replace: true, state: { book} });
    }

    return (
        <div className="catalog-container">
            <div className="row h-100">

                <div className="col col-md-3 border-end filter-form">
                    <h5>Filtros</h5>

                    <form className="mb-3">
                        <label className="form-label">
                            Rango de precio: ${priceFilter}
                        </label>

                        <input
                            type="range"
                            className="form-range"
                            min={minPrecio}
                            max={maxPrecio}
                            step="1"
                            value={priceFilter}
                            onChange={handlePriceFilterChange}
                        />

                        <div className="d-flex justify-content-between">
                            <span>{minPrecio}</span>
                            <span>{maxPrecio}</span>
                        </div>
                    </form>

                    <form className="mb-3">
                        <label htmlFor="">Categorías | Generos</label>
                        <select name="" id="" className="form-select">
                            <option value="">Todas</option>
                            <option value="1">Categoría 1</option>
                            <option value="2">Categoría 2</option>
                            <option value="3">Categoría 3</option>
                        </select>
                    </form>

                    <form>
                        <label htmlFor="">Fecha de publicación</label>
                        <input type="date" name="" id="" className="form-control" />
                    </form>
                </div>


                <div className="col col-md-9">

                    <form
                        className="mb-3 d-flex gap-2"
                        onSubmit={handleSearchSubmit}
                    >
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Buscar libro, autor, descripción..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <button className="btn btn-dark" type="submit">
                            Buscar
                        </button>
                        <button className="btn btn-primary" type="button" onClick={handleReset}>Reset</button>
                    </form>


                    <div className="catalog-list">
                        {paginatedItems.length === 0 && (
                            <p className="text-muted">
                                No se encontraron resultados.
                            </p>
                        )}

                        {paginatedItems.map(item => (
                            <CatalogItem
                                key={`${item.titulo}-${item.autor}`}
                                onViewDetail={handleViewDetail}
                                data={item}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-4 d-flex justify-content-center">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
